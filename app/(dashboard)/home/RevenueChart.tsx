"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "antd";

interface RevenueChartProps {
  data: { name: string; value: number }[];
  title: string;
  subTitle: string;
  description: string;
  height?: number;
  width?: number;
}

const RevenueChart = ({
  title,
  data,
  subTitle,
  description,
  ...rest
}: RevenueChartProps) => {
  return (
    <Card  title={<h2>{title}</h2>}>
      <h3>{subTitle}</h3>
      <ResponsiveContainer {...rest}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1890ff" />
        </BarChart>
      </ResponsiveContainer>
      <p>{description}</p>
    </Card>
  );
};

export default RevenueChart;
