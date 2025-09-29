import React from "react";
import RevenueChart from "./RevenueChart";
import Overview from "./Overview";
import WelcomeDashboard from "./WelcomeDashboard";
import OrderList from "./OrderList";
import TabBar from "./TabBar";

function Dashboard() {
  return (
    <div>
      <TabBar />
      {/* <WelcomeDashboard />
      <Overview />
      <RevenueChart
        data={[
          { name: "Jan", value: 400 },
          { name: "Feb", value: 300 },
          { name: "Mar", value: 500 },
          { name: "Apr", value: 700 },
          { name: "May", value: 600 },
        ]}
        title="Revenue"
        subTitle={"$50,000"}
        description="Increase of 10% compared to last month"
        height={200}
      />
      <OrderList /> */}
    </div>
  );
}

export default Dashboard;
