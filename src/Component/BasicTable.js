import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./Columns";
import Mock_Data from "../Data/MOCK_DATA.json";

const BasicTable = () => {
  //useMemo is a react hook that can memorize an operation and optimize the performanc.
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Mock_Data, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headergroup) => (
          <tr {...headergroup.getHeaderGroupProps()}>
            {headergroup.headers.map((column) => (
              <th {...column.getHeaderProps()}> {column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")} </td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BasicTable;
