import Plotly from "plotly.js-dist";
import React, { useEffect } from "react";

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
}

const Lake3DContourPlot = () => {
  useEffect(() => {
    const mock = new MockData();
    const { temperature, oxygen, y } = mock.generateData();

    const z = temperature.map((tempRow, i) =>
      tempRow.map((temp, j) => temp + 0.1 * oxygen[i][j])
    );

    const data = [
      {
        z,
        y,
        x: Array.from({ length: temperature[0].length }, (_, i) => i),
        type: "contour",
        colorscale: [
          [0, "rgb(0,0,255)"],
          [1, "rgb(255,0,0)"],
        ],
        contours: {
          coloring: "heatmap",
          showlines:false,
        },
        colorbar: {
          title: "Temperature + Oxygen Effect",
          tickfont: { color: "#D1D5DB" }, // White text on the color bar
          titlefont: { color: "#D1D5DB" }, // White text for the color bar title
        },
      },
    ];

    const layout = {
      title: {
        text: "3D Lake Contour Plot",
        font: { color: "#D1D5DB" }, // Equivalent of Tailwind's text-zinc-300
      },
      xaxis: {
        title: {
          text: "Horizontal Distance",
          font: { color: "#D1D5DB" },
        },
        tickfont: { color: "#D1D5DB" },
      },
      yaxis: {
        title: {
          text: "Depth (m)",
          font: { color: "#D1D5DB" },
        },
        tickfont: { color: "#D1D5DB" },
        autorange: "reversed", // Ensures depth starts from the top
      },
      paper_bgcolor: "rgba(0,0,0,0)", // Transparent background
      plot_bgcolor: "rgba(0,0,0,0)", // Transparent background
    };    

    Plotly.newPlot("lakeDiv", data, layout);
  }, []);

  return (
    <section id="mockdata" className="section">
      <div className="container">
        <div id="lakeDiv" className="relative p-4 rounded-2xl bg-zinc-800 ring-1 ring-inset ring-zinc-50/5 transition-colors shadow-md" />
      </div>
    </section>
  );
};

export default Lake3DContourPlot;
