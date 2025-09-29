import { Flex, Spin } from "antd";
import React from "react";

function Loading() {
  return (
    <Flex align="center" gap="middle" justify="center">
      <Spin percent={"auto"} />
    </Flex>
  );
}

export default Loading;
