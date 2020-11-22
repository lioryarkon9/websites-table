import React from "react";
import styled from "styled-components";

import { useWebsiteTable } from "../useWebsiteTable";

const WebsitesTable = ({ websites }) => {
  const {
    prepareRow,
    page,
    headers,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state,
    pageOptions,
  } = useWebsiteTable(websites);

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
    <Container>
      <table>
        <thead>
          <tr>
            {headers.map((column) => (
              <th key={column.Header} {...getSortingProps(column)}>
                {column.Header}{" "}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
                <div>{canRenderFilter(column) && column.render("Filter")}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{page.map(renderRow)}</tbody>
      </table>

      <Pagination>
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>{" "}
        <span>{state.pageIndex + 1}</span>/<span>{pageOptions.length}</span>{" "}
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </Pagination>
    </Container>
  );
};

const Pagination = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
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
`;

const canRenderFilter = (column) =>
  column.canFilter && (column.Header === "Name" || column.Header === "Latency");

const getSortingProps = (column) => {
  if (column.Header === "Name" || column.Header === "Latency") {
    return column.getHeaderProps(column.getSortByToggleProps());
  }

  return {};
};

export default WebsitesTable;
