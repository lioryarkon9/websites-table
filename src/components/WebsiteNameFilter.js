import React from "react";

const WebsiteNameFilter = ({ column }) => {
  const { filterValue, preFilteredRows, setFilter } = column;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${preFilteredRows.length} websites...`}
    />
  );
};

export default WebsiteNameFilter;
