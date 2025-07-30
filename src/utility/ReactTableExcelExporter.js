import React from 'react'
import PropTypes from 'prop-types'
import innerText from 'react-innertext'
import ReactExport from 'react-data-export'
import { get, isString, isObject } from 'lodash'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet

const isFunction = function(obj) {
  return typeof obj === 'function'
}

function printExcelFileByParentId(document, idParent) {
  const excelFileElement = document.getElementById(idParent).childNodes[0]
  const keys = Object.keys(excelFileElement)

  for (const key of keys) {
    if (excelFileElement[key].onClick) {
      excelFileElement[key].onClick()
    }
  }
}

function getTitleFromHeader(col) {
  return col.Header
}

function getKeyFromAccessor(col) {
  return col.accessor
}

function mapColumn(col) {
  return {
    title: getTitleFromHeader(col),
    dataKey: getKeyFromAccessor(col),
    render: col.Cell,
  }
}

function filterColumn(col, index, attr) {
  if (col.accessor === undefined) {
    return false
  } else if (attr) {
    if (Array.isArray(attr)) {
      return attr.find((x) => x === getKeyFromAccessor(col))
    } else {
      if (attr.exclude && Array.isArray(attr.exclude)) {
        return !attr.exclude.find((x) => x === getKeyFromAccessor(col))
      }
    }
  }
  return true
}

function findIndexInsert(reactColumns, configVal, key) {
  return reactColumns.findIndex((x) => configVal === x[key])
}

function insertAfter(reactColumns, configVal, key, dataInsert) {
  const index = findIndexInsert(reactColumns, configVal, key)
  reactColumns.splice(index + 1, 0, dataInsert)
}

function insertBefore(reactColumns, configVal, key, dataInsert) {
  const index = findIndexInsert(reactColumns, configVal, key)
  reactColumns.splice(index, 0, dataInsert)
}

function getReactColumns(props) {
  const { attributes, refReactTable, columns } = props
  const includes = get(attributes, 'include', [])
  const curColumns = get(refReactTable, 'current.props.columns', columns)

  if (curColumns) {
    const reactCols = curColumns
      .filter((col, index) => filterColumn(col, index, attributes))
      .map(mapColumn)
    for (let i = 0; i < includes.length; i++) {
      const include = includes[i]
      if (isString(include)) {
        reactCols.push({
          title: include,
          dataKey: include,
        })
      } else if (isObject(include)) {
        const { title, dataKey, render, ...config } = include
        const dataCol = { title, dataKey, render }
        if (config.after) {
          insertAfter(reactCols, config.after, 'dataKey', dataCol)
        } else if (config.before) {
          insertBefore(reactCols, config.before, 'dataKey', dataCol)
        } else if (config.afterTitle) {
          insertAfter(reactCols, config.afterTitle, 'title', dataCol)
        } else if (config.beforeTitle) {
          insertBefore(reactCols, config.beforeTitle, 'title', dataCol)
        } else {
          reactCols.push(dataCol)
        }
      }
    }
    return reactCols
  }

  return []
}

function getInnerText(col, item, indexItem) {
  const value = get(item, col.dataKey)
  if (isFunction(col.render)) {
    return innerText(
      col.render({
        index: indexItem,
        original: item,
        column: {
          id: col.dataKey,
        },
        value,
      }),
    )
  }
  return value
}

function generateDataSet(columnsReactTable, data) {
  const columnsTitle = []
  for (let i = 0; i < columnsReactTable.length; i++) {
    const col = columnsReactTable[i]
    columnsTitle.push(col.title)
  }

  const numberColumns = [
    'Daya Tampung',
    'Jumlah Usulan',
    'Jumlah Lokasi (Terkirim)',
    'Jumlah Unit (Terkirim)',
    'Jumlah Lokasi (Belum)',
    'Jumlah Unit (Belum)',
    'Jumlah Lokasi (Total)',
    'Jumlah Unit (Total)',
  ]

  const curData = data.map((item, indexItem) => {
    return columnsReactTable.map((col, indexCol) => {
      const key = getKeyFromAccessor(col)
      const text = getInnerText(col, item, indexItem)
      // return {
      //   value: text ? text?.toString() : '',
      // };

      if (numberColumns.includes(col.title)) {
        return text ? Number(text) : 0
      } else {
        return text ? text?.toString() : ''
      }
    })
  })

  return {
    columns: columnsTitle,
    data: curData,
  }
}

function getSheets(props) {
  const { sheets } = props
  return Array.isArray(sheets) ? sheets : [sheets]
}

function fnDownload(id) {
  return () => printExcelFileByParentId(document, id)
}

function ReactTableExcelExporter(props) {
  const { id, filename, render } = props
  const cols = getReactColumns(props)
  const curSheets = getSheets(props)

  const dataSets = curSheets.map((sheet) => {
    return generateDataSet(cols, sheet.data)
  })

  return (
    <React.Fragment>
      <div id={id} style={{ display: 'none' }}>
        <ExcelFile element={<div />} filename={filename}>
          {curSheets.map((sheet, index) => {
            return (
              <ExcelSheet
                key={index}
                dataSet={[dataSets[index]]}
                name={sheet.name}
              />
            )
          })}
        </ExcelFile>
      </div>
      {render && render(fnDownload(id))}
    </React.Fragment>
  )
}

ReactTableExcelExporter.propTypes = {
  id: PropTypes.string.isRequired,
  attributes: PropTypes.oneOfType([
    PropTypes.shape({
      include: PropTypes.arrayOf(PropTypes.string),
      exclude: PropTypes.arrayOf(PropTypes.string),
    }),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  columns: PropTypes.array,
  filename: PropTypes.string.isRequired,
  sheets: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        data: PropTypes.array,
      }),
    ),
    PropTypes.shape({
      name: PropTypes.string,
      data: PropTypes.array,
    }),
  ]).isRequired,
  refReactTable: PropTypes.object,
  render: PropTypes.func.isRequired,
}

export default ReactTableExcelExporter
