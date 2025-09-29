import React from "react";
import { Button, Card, Row, Col } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const WelcomePage: React.FC = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "60vh" }}>
      <Col span={12}>
        <Card
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <SmileOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
          <h2>Hello there!</h2>
          <p style={{ fontSize: "18px" }}>
            We&apos;re glad to have you here. Start exploring the features of
            our amazing app.
          </p>
          <br />
          <a href="/dashboard">
            <Button type="primary" size="large" style={{ marginTop: "20px" }}>
              Get Started
            </Button>
          </a>
        </Card>
      </Col>
    </Row>
  );
};

export default WelcomePage;
