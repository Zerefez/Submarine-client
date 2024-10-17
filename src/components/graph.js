import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Graph({ data, title }) {
  return (
    <div className="relative p-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-colors shadow-md">
      <div className="text-center mb-4">
        <Text
          x={500}
          y={30}
          textAnchor="middle"
          fontSize="30px"
          fontWeight="bold"
          fill="#FFF"
        >
          {title}
        </Text>
      </div>

      <div className="rounded-xl bg-zinc-800 p-5 shadow-lg">
        <ResponsiveContainer width="100%" height={600}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="time" stroke="#A0AEC0" />
            <YAxis
              label={{
                value: "Values",
                angle: -90,
                position: "insideLeft",
                fill: "#A0AEC0",
              }}
              stroke="#A0AEC0"
            />
            <Tooltip />
            <Legend />

            {/* Line for Temperature */}
            <Line
              type="monotone"
              dataKey="temperature_in"
              stroke="#ba0921"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              name="Temperature (°C)"
            />

            {/* Line for Pressure */}
            <Line
              type="monotone"
              dataKey="pressure"
              stroke="#1f77b4"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              name="Pressure (hPa)"
            />

            {/* Line for CO2 Level */}
            <Line
              type="monotone"
              dataKey="co2Level"
              stroke="#2ca02c"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              name="CO2 Level (ppm)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graph;
