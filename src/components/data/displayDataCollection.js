import React, { useState, useEffect } from 'react';
import MeasurementTable from './measurementCollection';
import ApiService from '../../apiService';

const DisplayDataTable = (props) => {
  const { setSelectedMeasurement } = props;
  const [data, setData] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    async function fetchMeasurements() {
      const apiService = new ApiService('http://192.168.0.1:8080');
      try {
        let fetchedMeasurements = await apiService.getRequest('measurements');
        setMeasurements(fetchedMeasurements);
        console.log(fetchedMeasurements);
      } catch (error) {
        console.error('Failed to fetch measurements:', error);
      }
    }

    fetchMeasurements();
  }, []); // Fetch measurements on component mount

  useEffect(() => {
    if (measurements.length > 0) {
      // Group measurements by groupingId and calculate total_measurement
      const groupedData = measurements.reduce((acc, measurement) => {
        const groupid = measurement.groupingId;

        if (!acc[groupid]) {
          acc[groupid] = {
            groupid: groupid,
            total_measurement: 0,
            timestamp: measurement.timestamp, // Take the first timestamp (or update logic as needed)
          };
        }

        // Sum up the measurement values for the group
        acc[groupid].total_measurement += 1;

        return acc;
      }, {});

      // Convert grouped data to an array
      const tableData = Object.values(groupedData);

      // Update the state with the transformed data
      setData(tableData);
    } else {
      setData([]); // If no measurements, set data to an empty array
    }
  }, [measurements]); // Runs whenever the `measurements` state changes

  const initialSortConfig = {
    key: null,
    direction: 'asc',
  };

  return (
    <div id="data-collection" className="section">
      <div className="container">
        <div>
          <h2 className="headline-2 mb-12 lg:mb-0">
            Measurement Data Collections
          </h2>
          <MeasurementTable
            data={data}
            setSelectedMeasurement={setSelectedMeasurement}
            initialSortConfig={initialSortConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayDataTable;
