import React from "react";
import MeasurementTable from "./measurementCollection";

const DisplayDataTable = () => {
  const tableData = [
    {
      groupid: "er13r12341234r1-3214fqefq",
      temperature: 12,
      oxygen: 5000,
      depth: 1,
      timestamp: "2021-09-01 1:00:00",
    },
    {
      groupid: "er13r12341234r1-3214fqefq",
      temperature: 20,
      oxygen: 7000,
      depth: 2,
      timestamp: "2021-09-01 1:03:00",
    },
    {
      groupid: "er13r12341234r1-3214fqefq",
      temperature: 30,
      oxygen: 8000,
      depth: 4,
      timestamp: "2021-09-01 1:10:00",
    },
  ];

  const initialSortConfig = {
    key: null,
    direction: "asc",
  };

  return (
    <div id="data-collection" className="section">
      <div className="container">
        <div>
          <h2 className="headline-2 mb-12 lg:mb-0">Measurement Data Collections</h2>
          <MeasurementTable
            data={tableData}
            initialSortConfig={initialSortConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayDataTable;
