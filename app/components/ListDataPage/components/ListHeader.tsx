import { Button, Col, Flex, Row } from 'antd';
import { ButtonProps } from 'antd/es/button';
import React from 'react';
import { HrCustom } from '../../common/HrCustom';
import { Metadata } from 'next';

interface ButtonAction extends ButtonProps {
  label: string;
  onClick: () => void;
}

export interface ListHeaderProps {
  title: string;
  meta?: Metadata;
  buttonActions?: ButtonAction[];
}

const titleStyle: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
  textDecoration: 'none',
};

function ListHeader({ title, buttonActions }: ListHeaderProps) {
  return (
    <div>
      <Row>
        <Col span={12}>
          <h2 style={titleStyle}>{title}</h2>
        </Col>
        <Col span={12}>
          <Flex justify={'flex-end'} gap={'small'} wrap>
            {buttonActions?.map((buttonAction) => (
              <Button key={buttonAction.label} {...buttonAction}>
                {buttonAction.label}
              </Button>
            ))}
          </Flex>
        </Col>
      </Row>
      <HrCustom />
    </div>
  );
}

export default ListHeader;
