"use client";
import { Card, Carousel, Switch, Tag } from "antd";
import Image from "next/image";
import React from "react";
import { IDataCard } from "./ListCardData";
import { Meta } from "antd/es/list/Item";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

type ActionsCardData = React.ReactNode | string;

export interface CardDataProps {
  data: IDataCard;
  actions?: Array<ActionsCardData>;
  actionEdit?: (data: IDataCard) => React.ReactNode;
  apiChangeStatus?: string;
}
const titleStyle: React.CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
  textDecoration: "none",
  width: "100%",
};

const descriptionStyle: React.CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
  textDecoration: "none",
  width: "100%",
};

function CardData({
  data,
  actions,
  actionEdit,
  apiChangeStatus,
}: CardDataProps) {
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(data.status);

  const handleChangeStatus = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setStatus(!status);
  };

  const actionsMerge = (() => {
    const result: Array<React.ReactNode> = [];
    if (!actions) return result;
    result.push(...actions);
    if (actionEdit) {
      result.push(actionEdit(data));
    }
    if (apiChangeStatus)
      result.push(
        <Switch
          key="status"
          checked={status}
          onChange={handleChangeStatus}
          loading={loading}
        />
      );
    return result;
  })();

  return (
    <Card
      style={{ width: 300, marginBottom: 16 }}
      cover={
        <Carousel arrows={data?.images ? true : false} infinite={true}>
          {data.images ? (
            data.images.map((image, index) => (
              <div key={index}>
                <Image
                  alt="example"
                  src={image}
                  layout="responsive"
                  max-height={160}
                  objectFit="cover"
                  width={300}
                  height={160}
                />
              </div>
            ))
          ) : (
            <div>
              <h3 style={contentStyle}>No image</h3>
            </div>
          )}
        </Carousel>
      }
      actions={actionsMerge}
      extra={data.state && <Tag color={"blue-inverse"}>{data.state}</Tag>}
    >
      <Meta
        title={<div style={titleStyle}>{data.title}</div>}
        description={<div style={descriptionStyle}>{data.description}</div>}
      />
    </Card>
  );
}

export default React.memo(CardData);
