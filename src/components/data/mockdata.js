import Plotly from 'plotly.js-dist';
import React, { useEffect, useState } from 'react';
import Areachart from '../areaChart';
import StepChart from '../stepChart';

// Mock Data Class
class MockData {
  constructor(depth = 5, rows = 10, cols = 10) {
    this.depth = depth;
    this.rows = rows;
    this.cols = cols;
    this.data = [];
  }

  generateData() {
    const temperature = [];
    const oxygen = [];
    const y = Array.from(
      { length: this.rows },
      (_, i) => (i / (this.rows - 1)) * this.depth
    ); // Depth levels

    for (let i = 0; i < this.rows; i++) {
      const tempRow = [];
      const oxyRow = [];
      for (let j = 0; j < this.cols; j++) {
        tempRow.push(4 + Math.random() * 10); // Simulated temperature
        oxyRow.push(6 + Math.random() * 4); // Simulated oxygen
      }
      temperature.push(tempRow);
      oxygen.push(oxyRow);
    }

    return { temperature, oxygen, y };
  }
  generateDepthOverTime() {
    const depthLevels = [0, 1, 2, 4, 5];
    return Array.from({ length: 20 }, (_, i) => ({
      time: i,
      depth: depthLevels[Math.floor(Math.random() * depthLevels.length)],
    }));
  }
}

// 3D Contour Plot Component
const Lake3DContourPlot = (props) => {
  const { socket } = props;

  const [chartData, setChartData] = useState([]);
  const [depthOverTime, setDepthOverTime] = useState([]);
  const [socketMessages, setSocketMessages] = useState([]);

  useEffect(() => {
    // Add WebSocket message listener
    if (socket) {
      const handleSocketMessage = (event) => {
        console.log('Message received from server:', event.data);
        // Update state with the received message
        setSocketMessages((prevMessages) => [...prevMessages, event.data]);
      };

      socket.addEventListener('message', handleSocketMessage);

      // Cleanup listener when component unmounts or socket changes
      return () => {
        socket.removeEventListener('message', handleSocketMessage);
      };
    }
  }, [socket]);

  useEffect(() => {
    const mock = new MockData();
    const { temperature, oxygen, y } = mock.generateData();
    const depthData = mock.generateDepthOverTime();

    const z = temperature.map((tempRow, i) =>
      tempRow.map((temp, j) => temp + 0.1 * oxygen[i][j])
    );

    const flatData = y.map((depth, i) => ({
      depth,
      temperature:
        temperature[i].reduce((a, b) => a + b, 0) / temperature[i].length,
      oxygen: oxygen[i].reduce((a, b) => a + b, 0) / oxygen[i].length,
    }));

    setChartData(flatData);
    setDepthOverTime(depthData);

    const data = [
      {
        z,
        y,
        x: Array.from({ length: temperature[0].length }, (_, i) => i),
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
          title: 'Temperature + Oxygen Effect',
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
          text: 'Horizontal Distance',
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

    Plotly.newPlot('lakeDiv', data, layout);
  }, []);

  return (
    <section id="mockdata" className="section">
      <div className="container">
        <h2 className="headline-2 mb-12 lg:mb-0">MockData</h2>
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
            xKey="time"
            yKey="depth"
            xLabel="Time(min)"
            yLabel="Depth (m)"
            title="Depth Over Time"
          />
        </div>
      </div>
    </section>
  );
};

export default Lake3DContourPlot;
