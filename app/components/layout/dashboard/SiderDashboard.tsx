import { MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import MenuDashboard from "./MenuDashboard";
import LogoDashboard from "./LogoDashboard";

interface SiderDashboardProps {
  menu: MenuProps["items"];
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

function SiderDashboard({ collapsed, setCollapsed }: SiderDashboardProps) {
  return (
    <Sider
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
    >
      <LogoDashboard />
      <MenuDashboard />
    </Sider>
  );
}

export default SiderDashboard;
