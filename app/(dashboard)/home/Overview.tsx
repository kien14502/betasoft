import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import StatChart from "./StatChart";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const data: { name: string; value: number }[] = [
  { name: "Ha Giang", value: 400 },
  { name: "Ninh Binh", value: 300 },
  { name: "Thuy Sy", value: 500 },
  { name: "Ai Cap", value: 700 },
  { name: "May", value: 600 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6347"];

const Overview: React.FC = () => {
  return (
    <Card title={<h2>Overview</h2>} >
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Users"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Trips"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Order"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <StatChart data={data} colors={COLORS} height={250} />
    </Card>
  );
};

export default Overview;
