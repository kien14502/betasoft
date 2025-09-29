"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface StatChartProps {
  data: { name: string; value: number }[];
  colors: string[];
  height?: number;
  width?: number;
}

const StatChart = ({ data, colors, ...rest }: StatChartProps) => {
  return (
    <ResponsiveContainer {...rest}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius="80%"
          fill="#8884d8"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatChart;
