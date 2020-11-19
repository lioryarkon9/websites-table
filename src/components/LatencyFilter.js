import React, { useMemo } from "react";
import styled from "styled-components";

const LatencyFilter = ({ column }) => {
  const { filterValue, setFilter, preFilteredRows } = column;

  const [min, max] = useMemo(() => {
    const initialRangeValue = getInitiaRangeValue(preFilteredRows);

    return preFilteredRows.reduce(
      (range, { values }) => {
        const { latency } = values;
        let [min, max] = range;

        if (latency < min) {
          min = latency;
        }

        if (latency > max) {
          max = latency;
        }

        return [min, max];
      },
      [initialRangeValue, initialRangeValue]
    );
  }, [preFilteredRows]);

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value));
        }}
      />

      {filterValue && (
        <FilterValue>
          showing latencies equal or greater than {filterValue}
        </FilterValue>
      )}

      <div>
        <button onClick={() => setFilter(undefined)}>Off</button>
      </div>
    </div>
  );
};

const FilterValue = styled.div`
  font-size: 10px;
  font-weight: 300;
  margin-bottom: 5px;
`;

const getInitiaRangeValue = (preFilteredRows) => {
  const [firstRow] = preFilteredRows;

  return firstRow ? firstRow.values.latency : 0;
};

export default LatencyFilter;
