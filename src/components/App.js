import React, { useState } from "react";
import styled from "styled-components";

import WebsitesTable from "./WebsitesTable";

const App = () => {
  const [mode, setMode] = useState("table");

  const toggleMode = () => {
    setMode(mode === "table" ? "json" : "table");
  };

  if (mode === "json") {
    return null;
  }

  return (
    <div>
      <WebsitesTable />
    </div>
  );
};

export default App;
