import Plotly from 'plotly.js-dist';
import React, { useEffect, useState } from 'react';
import Areachart from '../areaChart';
import StepChart from '../stepChart';
import MeasurementData from './measurementData'; // Import the MeasurementData class

const Lake3DContourPlot = (props) => {
  const { socket, status } = props;

  const [chartData, setChartData] = useState([]);
  const [depthOverTime, setDepthOverTime] = useState([]);
  const [socketMessages, setSocketMessages] = useState([]);

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

            // Update chartData and depthOverTime
            const flatData = processedMeasurements.map((measurement) => ({
              depth: measurement.getDepth(),
              temperature: measurement.getTemperature(),
              oxygen: measurement.getOxygen(),
            }));

            const depthTimeData = flatData.map((data, index) => ({
              time: index,
              depth: data.depth,
            }));

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
  }, [socket]);

  useEffect(() => {
    if (chartData.length > 0) {
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
              title: 'Oxygen (mg/L)',
              tickfont: { color: '#D1D5DB' },
              titlefont: { color: '#D1D5DB' },
            },
          },
        ];

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
        <h2 className="headline-2 mb-12 lg:mb-0">Lake Data</h2>
        <div
          id="lakeDiv"
          className="mt-12 relative p-4 rounded-2xl bg-zinc-800 ring-1 ring-inset ring-zinc-50/5 transition-colors shadow-md w-full"
          style={{ width: '100%', height: '700px' }}
        />
        <div className="mt-12 lg:grid lg:grid-cols-2 lg:items-stretch">
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
            data={depthOverTime}
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
