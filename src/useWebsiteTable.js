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

  return useTable(
    {
      columns,
      data: useMemo(() => mock.items, []),
      initialState: { pageIndex: 0, pageSize: 17 },
    },
    usePagination
  );
};
