import classNames from "classnames";
import React, { Fragment, useEffect } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import ReactPaginate from "react-paginate";
import {
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { Table as ReactstrapTable, Spinner } from "reactstrap";

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

const SortButton = ({ column }) => {
  return (
    <>
      <span className="d-flex flex-column ms-2">
        <ChevronUp
          size={14}
          strokeWidth={column.isSorted && column.isSortedDesc ? 3 : 2}
          style={{
            marginBottom: -3,
            color:
              column.isSorted && column.isSortedDesc ? "var(--bs-primary)" : "",
          }}
        />
        <ChevronDown
          strokeWidth={column.isSorted && !column.isSortedDesc ? 3 : 2}
          size={14}
          style={{
            marginTop: -3,
            color:
              column.isSorted && !column.isSortedDesc
                ? "var(--bs-primary)"
                : "",
          }}
        />
      </span>
    </>
  );
};
const Table = (props) => {
  const {
    columns,
    data = [],
    isFetching,
    onPaginationChange,
    onSortChange,
    blockLayout = false,
    resizeable = false,
    sticky = false,
    totalPages = 1,
    sortable = false,
    pagination = true,
    page = 1,
  } = props;
  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  );

  const plugins = [];
  const isBlockLayout = blockLayout || resizeable;
  if (sortable) {
    plugins.push(useSortBy);
  }

  if (blockLayout || resizeable) {
    plugins.push(useBlockLayout);
  }
  if (resizeable) {
    plugins.push(useResizeColumns);
  }
  if (sticky) {
    plugins.push(useSticky);
  }

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    getTableBodyProps,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      manualSortBy: true,
    },
    ...plugins
  );

  const handlePagination = (page) => {
    onPaginationChange?.({
      page: page.selected + 1,
    });
  };

  useEffect(() => {
    onSortChange?.({ sorted: sortBy, page: 1 });
  }, [onSortChange, sortBy]);

  return (
    <Fragment>
      {isBlockLayout ? (
        <div className="table-wrapper">
          <div {...getTableProps()} className={classNames("table", { sticky })}>
            <div className="thead">
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps({})} className="tr">
                  {headerGroup.headers.map((column) => {
                    return (
                      <div
                        {...column.getHeaderProps(
                          sortable && column.canSort
                            ? column.getSortByToggleProps()
                            : undefined
                        )}
                        className="th"
                      >
                        <div
                          title={
                            column?.Header && typeof column.Header !== "object"
                              ? column.Header || undefined
                              : undefined
                          }
                          className="d-flex align-items-center text-truncate"
                        >
                          {column.render("Header")}
                          {sortable && column.canSort ? (
                            <SortButton column={column} />
                          ) : null}
                        </div>
                        {!column.sticky && resizeable && (
                          <div
                            {...column.getResizerProps()}
                            className={`resizer ${
                              column.isResizing ? "isResizing" : ""
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
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
      ) : (
        <ReactstrapTable
          responsive
          bordered
          className={classNames("table", { sticky })}
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  const align = column?.align;
                  return (
                    <th
                      {...column.getHeaderProps(
                        sortable ? column.getSortByToggleProps() : undefined
                      )}
                      title={
                        column?.Header && typeof column.Header !== "object"
                          ? column.Header || undefined
                          : undefined
                      }
                    >
                      <div
                        className={`d-flex align-items-center text-truncate${
                          align ? ` text-${align}` : ""
                        }`}
                      >
                        {column.render("Header")}
                        {sortable && column.canSort ? (
                          <SortButton column={column} />
                        ) : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {!isFetching && (
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      const align = cell.column?.align;
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={`${align ? ` text-${align}` : ""}`}
                          title={
                            cell?.value &&
                            typeof cell.value !== "object" &&
                            cell?.column?.showTitle !== false
                              ? cell.value || undefined
                              : undefined
                          }
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </ReactstrapTable>
      )}

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
      {pagination ? (
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          forcePage={page - 1}
          onPageChange={handlePagination}
          pageCount={totalPages}
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
      ) : null}
    </Fragment>
  );
};

export default Table;
