import React, { useState, useEffect } from "react";
import styled from "styled-components";

import WebsitesTable from "./WebsitesTable";

const App = () => {
  const [mode, setMode] = useState("table");
  const [websites, setWebsites] = useState([]);

  const toggleMode = () => {
    setMode(mode === "table" ? "json" : "table");
  };

  useEffect(function fetchWebsites() {
    fetch("https://run.mocky.io/v3/8764cfad-da54-4b54-9ee0-685c347a0b2e")
      .then((httpResponse) => httpResponse.json())
      .then((websites) => setWebsites(websites.items));
  }, []);

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
              <WebsitesTable websites={websites} />
            </TableContainer>
          )}

          {mode === "json" && (
            <pre>
              <code>{JSON.stringify(websites, null, 2)}</code>
            </pre>
          )}
        </Content>
      </WidthContainer>
    </Layout>
  );
};

const ToggleButton = styled.button`
  background-color: ${({ isActive }) => (isActive ? "green" : "transparent")};
  color: ${({ isActive }) => (isActive ? "#fff" : "inherit")};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "auto")};
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
