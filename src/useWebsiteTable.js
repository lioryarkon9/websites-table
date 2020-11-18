import { useTable, usePagination } from "react-table";
import { useMemo } from "react";

import { mock } from "./mock";

export const useWebsiteTable = () => {
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
      data: useMemo(() => [...mock.items].sort(bySiteNameAndLatency), []),
      initialState: { pageIndex: 0, pageSize: 17 },
    },
    usePagination
  );
};
