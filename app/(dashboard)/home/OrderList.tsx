"use client";
import React from "react";
import { Card, TablePaginationConfig, Tag } from "antd";
import ListTableData from "@/app/components/ListDataPage/components/ListTableData";

const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "orderDate",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: string) => <Tag color="magenta">{value}</Tag>,
  },
];

const data = [
  {
    key: "1",
    orderId: "12345",
    customerName: "John Doe",
    orderDate: "2023-10-01",
    status: "Pending",
  },
  {
    key: "2",
    orderId: "12346",
    customerName: "Jane Smith",
    orderDate: "2023-10-02",
    status: "Completed",
  },
  {
    key: "3",
    orderId: "12347",
    customerName: "Alice Johnson",
    orderDate: "2023-10-03",
    status: "Shipped",
  },
  {
    key: "4",
    orderId: "12348",
    customerName: "Bob Brown",
    orderDate: "2023-10-04",
    status: "Cancelled",
  },
  {
    key: "5",
    orderId: "12349",
    customerName: "Charlie Davis",
    orderDate: "2023-10-05",
    status: "Processing",
  },
];

const pagination: TablePaginationConfig = {
  current: 1,
  pageSize: 10,
  total: 3,
  onChange: (page, pageSize) => {
    console.log(`Page: ${page}, PageSize: ${pageSize}`);
  },
};

function OrderList() {
  return (
    <Card title={<h2>New orders</h2>}>
      <ListTableData
        columns={columns}
        dataSource={data}
        pagination={pagination}
      />
    </Card>
  );
}

export default OrderList;
