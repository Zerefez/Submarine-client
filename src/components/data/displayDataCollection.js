import React from "react";
import MeasurementTable from "./measurementCollection";

const DisplayDataTable = () => {
  const tableData = [
    {
      groupid: "er13r12341234r1-3214fqefq",
      total_measurement: 300,
      timestamp: "2021-09-01 1:00:00",
    },
    {
      groupid: "32142341341-3141fdfasf",
      total_measurement: 300,
      timestamp: "2021-09-01 1:03:00",
    },
    {
      groupid: "dfadfafadf-erqwerqreqewr",
      total_measurement: 300,
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
