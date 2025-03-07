"use client"; // Required if using Next.js App Router

import { getDailyExpense } from "@/app/script/expense.controller";
import { useState, useEffect } from "react";
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

// const data = [
//   { name: "Page A", expense: 4000, planed: 2400, amt: 2400 },
//   { name: "Page B", expense: 3000, planed: 1398, amt: 2210 },
//   { name: "Page C", expense: 2000, planed: 9800, amt: 2290 },
//   { name: "Page D", expense: 2780, planed: 3908, amt: 2000 },
//   { name: "Page E", expense: 1890, planed: 4800, amt: 2181 },
//   { name: "Page F", expense: 2390, planed: 3800, amt: 2500 },
//   { name: "Page G", expense: 3490, planed: 4300, amt: 2100 },
// ];

const ExampleChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const dailyExpense = await getDailyExpense();
      setData(dailyExpense);
    };
    fetchData();
  }, []);
  console.log("cata", data);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="50%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            className="mx-4 bg-[#196981]"
            dataKey="amount"
            stackId="a"
            fill="#196981"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExampleChart;
