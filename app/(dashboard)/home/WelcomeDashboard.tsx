import React from "react";
import { Card } from "antd";

function WelcomeDashboard() {
  return (
    <Card style={{ marginBottom: "20px", backgroundColor: "#f5f5f5" }}>
      <h2 style={{ marginBottom: "20px" }}>Welcome To Trip Admin Dashboard!</h2>
      <p>
        Manage your trips, view revenue statistics, and get insights into your
        business performance.
      </p>
    </Card>
  );
}

export default WelcomeDashboard;
