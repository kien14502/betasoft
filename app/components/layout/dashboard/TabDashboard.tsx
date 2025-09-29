"use client";

import React, { useEffect } from "react";
import { Button, Tabs } from "antd";
import { useAppDispatch, useAppSelector } from "@/app/reduxs/hooks";
import {
  setActiveKey,
  removeTab,
  closeAll,
  addTab,
} from "@/app/reduxs/tabs/tabs.slice";
import menu from "@/app/(dashboard)/menu";
import { usePathname } from "next/navigation";
import { setActiveMenuKey } from "@/app/reduxs/menu/menu.slice";

export type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const TabDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { listTabs, activeTabKey } = useAppSelector((state) => state.tabs);

  useEffect(() => {
    const pathWithoutSlash = pathname.startsWith("/")
      ? pathname.slice(1)
      : pathname;

    const currentMenu = menu.find((item) => item.key === pathWithoutSlash);
    console.log("first", currentMenu?.key);
    dispatch(
      addTab({
        label: currentMenu?.title ?? "",
        key: currentMenu?.key ?? "",
        children: currentMenu?.component ?? <></>,
      })
    );

    dispatch(setActiveMenuKey(currentMenu?.key ?? ""));
  }, []);

  const onChange = (key: string) => {
    console.log("listTabs", listTabs);
    dispatch(setActiveKey(key));
  };

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "remove") {
      dispatch(removeTab(targetKey));
    }
  };

  const handleCloseAll = () => {
    dispatch(closeAll());
  };

  return (
    <div
      style={{
        height: "87vh",
        padding: "1vh",
        backgroundColor: "white",
      }}
    >
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeTabKey}
        type="editable-card"
        onEdit={onEdit}
        tabBarExtraContent={<Button onClick={handleCloseAll}>Close all</Button>}
        items={listTabs}
      ></Tabs>
    </div>
  );
};

export default TabDashboard;
