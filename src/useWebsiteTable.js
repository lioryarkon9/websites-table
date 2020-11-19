import { useTable, usePagination, useFilters } from "react-table";
import { useMemo } from "react";

import WebsiteNameFilter from "./components/WebsiteNameFilter";
import LatencyFilter from "./components/LatencyFilter";

export const useWebsiteTable = (websites) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "siteName",
        filter: (rows, _, filterValue) =>
          rows.filter(({ values }) => {
            const websiteName = values.siteName;

            return websiteName === undefined
              ? true
              : websiteName.toLowerCase().match(new RegExp(filterValue, "g"));
          }),
        Filter: WebsiteNameFilter,
      },
      {
        Header: "Latency",
        accessor: "latency",
        filter: (rows, _, filterValue) =>
          rows.filter(({ values }) => values.latency >= filterValue),
        Filter: LatencyFilter,
      },
      {
        Header: "URL",
        accessor: "URL",
      },
    ],
    []
  );

  const bySiteNameAndLatency = (
    { siteName: siteNameA, latency: latencyA },
    { siteName: siteNameB, latency: latencyB }
  ) => {
    if (siteNameA === siteNameB) {
      if (latencyA > latencyB) {
        return -1;
      }
    }

    if (siteNameA < siteNameB) {
      return -1;
    }

    return 1;
  };

  return useTable(
    {
      columns,
      data: useMemo(() => [...websites].sort(bySiteNameAndLatency), [websites]),
      initialState: { pageIndex: 0, pageSize: 17 },
    },
    useFilters,
    usePagination
  );
};
