"use client"; // Required if using Next.js App Router

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", expense: 4000, planed: 2400, amt: 2400 },
  { name: "Page B", expense: 3000, planed: 1398, amt: 2210 },
  { name: "Page C", expense: 2000, planed: 9800, amt: 2290 },
  { name: "Page D", expense: 2780, planed: 3908, amt: 2000 },
  { name: "Page E", expense: 1890, planed: 4800, amt: 2181 },
  { name: "Page F", expense: 2390, planed: 3800, amt: 2500 },
  { name: "Page G", expense: 3490, planed: 4300, amt: 2100 },
];

const ExampleChart = () => {
  return (
    <div style={{ width: "50%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expense" stackId="a" fill="#8884d8" />
          <Bar dataKey="planed" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExampleChart;
