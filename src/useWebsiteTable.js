import { useTable, usePagination } from "react-table";
import { useMemo } from "react";

export const useWebsiteTable = (websites) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "siteName",
      },
      {
        Header: "Latency",
        accessor: "latency",
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
    usePagination
  );
};
