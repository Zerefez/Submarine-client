import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function StepChart({ data, xKey, yKey, yLabel, xLabel, title }) {
  const maxDepth = Math.max(1, ...data.map((item) => item.depth)); // Ensure maxDepth is at least 1

  const ticks = Array.from({ length: maxDepth + 1 }, (_, i) => i);

  return (
    <div className="mb-8">
      <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            label={{ value: xLabel, position: 'bottom', offset: -10 }}
            dataKey={xKey}
          />
          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: 'insideLeft',
              offset: 20,
            }}
            ticks={ticks}
            domain={[5, 0]}
            reversed={true}
          />
          <Tooltip />
          <Legend />
          <Line
            type="stepBefore"
            dataKey={yKey}
            stroke="#32CD32"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StepChart;
