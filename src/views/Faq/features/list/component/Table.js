import { useBlockLayout, useTable, useResizeColumns } from "react-table";
import { Table, Spinner } from "reactstrap";
import { useSticky } from "react-table-sticky";
import ReactPaginate from "react-paginate";
import { Fragment } from "react";

export const ListTable = (props) => {
  const { columns, data, isFetching, tableAttr, handleTableAttrChange } = props;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: data?.data || [],
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

  // const pageCount = data?.pages ? Math.ceil(data.pages / tableAttr.pageSize) : 1
  const pageCount = data?.pages;

  // Render the UI for your table
  return (
    <Fragment>
      <Table responsive bordered className="sticky" {...getTableProps()}>
        <thead className="header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th {...column.getHeaderProps()} className={`text-truncate`}>
                    {column.render("Header")}
                    {!column.sticky && (
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? "isResizing" : ""
                        }`}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        {!isFetching && (
          <tbody {...getTableBodyProps()} className="body">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className={`text-truncate`}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
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
          "pagination react-paginate separated-pagination pagination-sm justify-content-center pe-1 mt-1"
        }
      />
    </Fragment>
  );
};
