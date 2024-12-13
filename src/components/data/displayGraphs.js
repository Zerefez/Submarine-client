import Plotly from 'plotly.js-dist';
import React, { useEffect, useState } from 'react';
import Areachart from '../areaChart';
import StepChart from '../stepChart';
import MeasurementData from './measurementData'; // Import the MeasurementData class
import ApiService from '../../apiService'; // Import the API service to fetch measurements

const Lake3DContourPlot = (props) => {
  const { socket, status, selectedMeasurement } = props;

  const [chartData, setChartData] = useState([]); // State for chart data
  const [depthOverTime, setDepthOverTime] = useState([]); // State for depth over time
  const [socketMessages, setSocketMessages] = useState([]); // State for socket messages
  const [measurements, setMeasurements] = useState([]); // State for all fetched measurements

  useEffect(() => {
    async function fetchMeasurements() {
      const apiService = new ApiService('http://192.168.0.1:8080');
      try {
        let fetchedMeasurements = await apiService.getRequest('measurements');
        setMeasurements(fetchedMeasurements);
        console.log('Fetched Measurements:', fetchedMeasurements);

        // If selectedMeasurement is provided, filter based on groupingId
        if (selectedMeasurement !== '') {
          // Find measurements with the selected groupingId
          const groupedMeasurements = fetchedMeasurements.filter(
            (measurement) => measurement.groupingId === selectedMeasurement
          );

          // Process and transform the grouped measurements into chart data
          const chartData = groupedMeasurements.map(
            transformMeasurementToChartData
          );
          setChartData(chartData);
        } else if (fetchedMeasurements.length > 0) {
          console.log('TEST RAN!!');

          // If no selectedMeasurement, use the latest one based on timestamp
          const latestMeasurement = fetchedMeasurements.reduce(
            (latest, current) => {
              return new Date(current.timestamp) > new Date(latest.timestamp)
                ? current
                : latest;
            }
          );

          // Get the groupingId of the latest measurement
          const latestGroupingId = latestMeasurement.groupingId;

          // Filter all measurements with the same groupingId
          const groupedMeasurements = fetchedMeasurements.filter(
            (measurement) => measurement.groupingId === latestGroupingId
          );

          // Process and transform the grouped measurements into chart data
          const chartData = groupedMeasurements.map(
            transformMeasurementToChartData
          );
          setChartData(chartData);
        }
      } catch (error) {
        console.error('Failed to fetch measurements:', error);
      }
    }

    fetchMeasurements();
  }, [selectedMeasurement]);

  // Function to transform a measurement to chart data format
  const transformMeasurementToChartData = (measurement) => {
    return new MeasurementData(
      measurement.temperatur, // Temperature
      measurement.oxygen, // Oxygen
      measurement.dybde, // Depth
      null // Spring layers (not available in raw data)
    );
  };

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (socket) {
      const handleSocketMessage = (event) => {
        console.log('Message received from server:', event.data);
        try {
          const rawData = JSON.parse(event.data);

          if (Array.isArray(rawData)) {
            const processedMeasurements = rawData
              .map((sensor) => {
                const measurement = new MeasurementData(
                  sensor.temperatur, // Temperature
                  sensor.oxygen, // Oxygen
                  sensor.dybde, // Pressure (not available in raw data)
                  null // Spring layers (not available in raw data)
                );
                return measurement.verifyData() ? measurement : null;
              })
              .filter((measurement) => measurement !== null);

            console.log('Processed Measurements:', processedMeasurements);

            // Update chartData and depthOverTime with new live measurements
            const flatData = processedMeasurements.map((measurement) => ({
              depth: measurement.getDepth(),
              temperature: measurement.getTemperature(),
              oxygen: measurement.getOxygen(),
            }));

            const depthTimeData = flatData.map((data, index) => ({
              time: index,
              depth: data.depth,
            }));

            console.log('DEPTHTIMEDATA', depthTimeData);

            setChartData(flatData);
            setDepthOverTime(depthTimeData);
            setSocketMessages((prevMessages) => [...prevMessages, event.data]);
          } else {
            console.warn('No sensors data found in the message');
          }
        } catch (error) {
          console.error('Error parsing WebSocket data:', error);
        }
      };

      socket.addEventListener('message', handleSocketMessage);

      return () => {
        socket.removeEventListener('message', handleSocketMessage);
      };
    }
  }, [socket]); // Runs when the socket connection is available

  // Update the plot when chartData changes
  useEffect(() => {
    if (chartData.length > 0) {
      console.log('USE EFFECT RAN!!');
      const lakeDiv = document.getElementById('lakeDiv');

      if (lakeDiv) {
        const z = chartData.map((data) => data.oxygen);
        const y = chartData.map((data) => data.depth);
        const x = chartData.map((data) => data.temperature);

        const data = [
          {
            z,
            y,
            x,
            type: 'contour',
            colorscale: [
              [0, 'rgb(0,0,255)'],
              [1, 'rgb(255,0,0)'],
            ],
            contours: {
              coloring: 'heatmap',
              showlines: false,
            },
            colorbar: {
              title: 'Oxygen (μg/L)',
              tickfont: { color: '#D1D5DB' },
              titlefont: { color: '#D1D5DB' },
            },
          },
        ];

        console.log('CHARTDATA,', chartData);

        const layout = {
          title: {
            text: '3D Lake Contour Plot',
            font: { color: '#D1D5DB' },
          },
          xaxis: {
            title: {
              text: 'Temperature (°C)',
              font: { color: '#D1D5DB' },
            },
            tickfont: { color: '#D1D5DB' },
          },
          yaxis: {
            title: {
              text: 'Depth (m)',
              font: { color: '#D1D5DB' },
            },
            tickfont: { color: '#D1D5DB' },
            autorange: 'reversed',
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
        };

        Plotly.newPlot(lakeDiv, data, layout);
      } else {
        console.warn('lakeDiv element not found');
      }
    }
  }, [chartData]);

  return (
    <section id="data" className="section">
      <div className="container">
        <h2 className="headline-2 mb-12 lg:mb-0">Measurement Data Graphs</h2>
        <div
          id="lakeDiv"
          className="mt-12 relative p-4 rounded-2xl bg-zinc-800 ring-1 ring-inset ring-zinc-50/5 transition-colors shadow-md w-full"
          style={{ width: '100%', height: '700px' }}
        />
        <div className="mt-12 lg:items-stretch">
          <Areachart
            data={chartData}
            xKey="depth"
            yKey="temperature"
            yLabel="Temperature (°C)"
            areaColor="#FF4500"
            title="Temperature vs Depth"
          />
          <Areachart
            data={chartData}
            xKey="depth"
            yKey="oxygen"
            yLabel="Oxygen (mg/L)"
            areaColor="#1E90FF"
            title="Oxygen vs Depth"
          />
          <StepChart
            data={chartData}
            yKey="depth"
            xLabel="Measurement"
            yLabel="Depth (m)"
            title="Depth Over Each Measurement"
          />
        </div>
      </div>
    </section>
  );
};

export default Lake3DContourPlot;
