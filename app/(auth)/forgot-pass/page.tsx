"use client";
import { Button, Card, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
function ForgotPassPage() {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    setLoading(true);
    console.log("Received values:", values);
    setTimeout(() => setLoading(false), 2000); // Simulate API call
  };
  return (
    <Row justify="center">
      <Col
        xs={24}
        sm={20}
        md={16}
        lg={12}
        xl={10}
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: "85%",
            margin: "auto",
            borderRadius: 0,
            padding: "5%",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "3em",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            Forgotten your password?
          </div>
          <p
            style={{ textAlign: "center", fontSize: "1.2em", fontWeight: 400 }}
          >
            There is nothing to worry about, we&apos;ll send you a message to help
            you reset your password.
          </p>

          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Email Address is required" },
                { type: "email", message: "Email is not valid" },
              ]}
            >
              <Input
                variant="underlined"
                style={{ height: "50px", background: "#eff5fb" }}
                placeholder="Enter personal or work email address"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: "40px" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "0px",
                  fontSize: "16px",
                }}
                loading={loading}
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default ForgotPassPage;
