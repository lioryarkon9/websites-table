import React from "react";

const WebsiteNameFilter = ({ column }) => {
  const { filterValue, preFilteredRows, setFilter } = column;

  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} websites...`}
    />
  );
};

export default WebsiteNameFilter;
