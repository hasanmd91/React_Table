import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { COLUMNS } from "./Columns";
import Mock_Data from "../Data/MOCK_DATA.json";
import GlobalFiltering from "./GlobalFilter";

const PaginationTable = () => {
  //useMemo is a react hook that can memorize an operation and optimize the performanc.
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Mock_Data, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setGlobalFilter,
    state,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headergroup) => (
            <tr {...headergroup.getHeaderGroupProps()}>
              {headergroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {" "}
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "x" : "y") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          {" "}
          Page{" "}
          <strong>
            {" "}
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <select value={pageSize} onChange={(e) => setPageSize(+e.target.value)}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {" "}
              Show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {" "}
          previous{" "}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {" "}
          next{" "}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
};

export default PaginationTable;
