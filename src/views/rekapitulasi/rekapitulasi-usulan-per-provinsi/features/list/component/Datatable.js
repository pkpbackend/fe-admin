import ComponentSpinner from "@components/spinner/Loading-spinner";
import React from "react";
import { useBlockLayout, useResizeColumns, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import { Alert } from "reactstrap";
import "./Datatable.scss";

const headerProps = (props, { column }) => getStyles(props, column.align);
const footerProps = (props, { column }) => getStyles(props, column.align);
const cellProps = (props, { cell }) => getStyles(props, cell.column.align);
const getStyles = (props, align = "left") => [
  props,
  {
    style: {
      justifyContent:
        align === "right"
          ? "flex-end"
          : align === "center"
          ? "center"
          : "flex-start",
      alignItems: "center",
      display: "flex",
    },
  },
];

const DataTable = (props) => {
  const { columns, data, isFetching } = props;
  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  );
  const { getTableProps, headerGroups, footerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: data || [],
        defaultColumn,
      },
      useBlockLayout,
      useResizeColumns,
      useSticky
    );

  return (
    <div>
      {isFetching ? (
        <div className="mb-5">
          <ComponentSpinner />
        </div>
      ) : rows.length > 0 ? (
        <div className="table-wrapper">
          <div {...getTableProps()} className="table">
            <div className="thead">
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps({})} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div
                      {...column.getHeaderProps(headerProps)}
                      className="th text-truncate"
                    >
                      <div
                        title={
                          column?.Header && typeof column.Header !== "object"
                            ? `${column.Header}` || undefined
                            : undefined
                        }
                      >
                        {column.render("Header")}
                      </div>
                      {!column.sticky && (
                        <div
                          {...column.getResizerProps()}
                          className={`resizer ${
                            column.isResizing ? "isResizing" : ""
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="tbody">
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()} className="tr ">
                    {row.cells.map((cell) => {
                      const title =
                        cell?.value &&
                        typeof cell.value !== "object" &&
                        cell?.column?.showTitle !== false
                          ? `${cell.value}` || undefined
                          : undefined;
                      return (
                        <div {...cell.getCellProps(cellProps)} className="td">
                          <div className="text-truncate" title={title}>
                            {cell.render("Cell")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="tfoot">
              {footerGroups.map((group) => {
                return (
                  <div className="tr" {...group.getFooterGroupProps()}>
                    {group.headers.map((column) => (
                      <div
                        className="td"
                        {...column.getFooterProps(footerProps)}
                      >
                        {column.render("Footer")}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Alert className="mx-4 fs-4 text-center" color="secondary ">
          Tidak ada data
        </Alert>
      )}
    </div>
  );
};

export default DataTable;
