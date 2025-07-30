import React, { Fragment } from "react";
import ReactPaginate from "react-paginate";
import { useTable, useBlockLayout, useResizeColumns } from "react-table";
import { useSticky } from "react-table-sticky";
import { Spinner } from "reactstrap";

const headerProps = (props, { column }) => getStyles(props, column.align);

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
  const { columns, data, isFetching, tableAttr, handleTableAttrChange } = props;
  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  );
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: data?.data || [],
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useSticky
  );

  const handlePagination = (page) => {
    handleTableAttrChange({
      page: page.selected + 1,
    });
  };

  const pageCount = data?.pages ?? 1;

  return (
    <Fragment>
      <div className="table-wrapper">
        <div {...getTableProps()} className="table">
          <div>
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
                          ? column.Header || undefined
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
          {!isFetching && (
            <div className="tbody">
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()} className="tr ">
                    {row.cells.map((cell) => {
                      return (
                        <div {...cell.getCellProps(cellProps)} className="td">
                          <div
                            className="text-truncate"
                            title={
                              cell?.value &&
                              typeof cell.value !== "object" &&
                              cell?.column?.showTitle !== false
                                ? cell.value.toString() || undefined
                                : undefined
                            }
                          >
                            {cell.render("Cell")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {isFetching && (
        <div
          className="p-4"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner type="grow" color="primary" />
          <Spinner type="grow" color="primary" />
          <Spinner type="grow" color="primary" />
        </div>
      )}
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        forcePage={tableAttr.page - 1}
        onPageChange={handlePagination}
        pageCount={pageCount}
        breakLabel={"..."}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-center pe-3 mt-3"
        }
      />
    </Fragment>
  );
};

export default DataTable;
