import React, { Fragment, useEffect } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useAsyncDebounce,
} from "react-table";
import { Table } from "reactstrap";

const DataTable = (props) => {
  let {
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    skipReset,
    totalRows,
    formFilter,
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy, filters },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
      autoResetPage: !skipReset,
      autoResetSortBy: !skipReset,
      useControlledState: (state) => {
        return React.useMemo(
          () => ({
            ...state,
            filters: formFilter,
          }),
          [state, formFilter]
        );
      },
    },
    useSortBy,
    usePagination
  );

  const fetchDataDebounce = useAsyncDebounce(fetchData, 100);

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchDataDebounce(true, { pageIndex, pageSize, sortBy, filters });
  }, [fetchDataDebounce, pageIndex, pageSize, sortBy]);

  return (
    <Fragment>
      <Table bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{totalRows} results
              </td>
            )}
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-center align-items-center">
        <button
          className={"p-2 btn btn-primary"}
          style={{
            borderStyle: "none",
            width: "150px",
            borderRadius: 50,
            marginTop: "1rem",
          }}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Prev
        </button>
        <span style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span style={{ paddingRight: "1rem" }}>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <button
          className={"p-2 btn btn-warning"}
          style={{
            borderStyle: "none",
            width: "150px",
            borderRadius: 50,
            marginTop: "1rem",
          }}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </Fragment>
  );
};

export default DataTable;
