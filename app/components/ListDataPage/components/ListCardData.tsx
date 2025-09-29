import { CardProps, Col, Pagination, PaginationProps, Row } from "antd";
import React from "react";
import CardData from "./CardData";

export interface ListCardDataProps extends CardProps {
  data: Array<IDataCard>;
  pagination: PaginationProps;
  apiChangeStatus?: string;
  actions?: Array<React.ReactNode>;
  actionEdit?: (data: IDataCard) => React.ReactNode;
}

export type IDataCard = {
  id: string;
  images?: Array<string>;
  title: string;
  description: string;
  status: boolean;
  state?: string;
};

export default function ListCardData({
  data,
  actions,
  actionEdit,
  pagination,
  apiChangeStatus,
}: ListCardDataProps) {
  return (
    <div>
      <Row gutter={[16, 24]}>
        {data?.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={12} xl={8} xxl={6}>
            <CardData
              data={item}
              actions={actions}
              apiChangeStatus={apiChangeStatus}
              actionEdit={actionEdit}
            />
          </Col>
        ))}
      </Row>
      <Pagination
        align={"end"}
        {...pagination}
        responsive={true}
        showSizeChanger={true}
      />
    </div>
  );
}
