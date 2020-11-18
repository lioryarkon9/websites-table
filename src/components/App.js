import React, { useState } from "react";
import styled from "styled-components";

import { useWebsiteTable } from "../useWebsiteTable";

const App = () => {
  const [mode, setMode] = useState("table");

  const toggleMode = () => {
    setMode(mode === "table" ? "json" : "table");
  };

  const { prepareRow, page, headers } = useWebsiteTable();

  if (mode === "json") {
    return null;
  }

  const renderRow = (row, ri) => {
    prepareRow(row);

    return (
      <tr key={ri} {...row.getRowProps()}>
        {row.cells.map((cell, ci) => {
          return (
            <td key={ci} {...cell.getCellProps()}>
              {cell.render("Cell")}
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            {headers.map(({ Header }) => (
              <th key={Header}>{Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{page.map(renderRow)}</tbody>
      </table>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

export default App;
