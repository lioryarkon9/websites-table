import React, { useState } from "react";
import styled from "styled-components";

import { mock } from "../mock";

import WebsitesTable from "./WebsitesTable";

const App = () => {
  const [mode, setMode] = useState("table");

  const toggleMode = () => {
    setMode(mode === "table" ? "json" : "table");
  };

  return (
    <Layout>
      <WidthContainer>
        <Content>
          <ToggleMode>
            <ToggleButton isActive={mode === "table"} onClick={toggleMode}>
              Table
            </ToggleButton>
            <ToggleButton isActive={mode === "json"} onClick={toggleMode}>
              JSON
            </ToggleButton>
          </ToggleMode>

          {mode === "table" && (
            <TableContainer>
              <WebsitesTable websites={mock} />
            </TableContainer>
          )}

          {mode === "json" && (
            <pre>
              <code>{JSON.stringify(mock.items, null, 2)}</code>
            </pre>
          )}
        </Content>
      </WidthContainer>
    </Layout>
  );
};

const ToggleButton = styled.button`
  background-color: ${({ isActive }) => (isActive ? "green" : "transparent")};
`;

const ToggleMode = styled.div`
  margin-bottom: 5px;
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const WidthContainer = styled.div`
  min-width: 1000px;
  max-width: 1700px;
  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const TableContainer = styled.div`
  flex-grow: 1;
`;

export default App;
