import { Col, Form, FormInstance, FormProps, Row } from 'antd';
import React from 'react';
import { HrCustom } from '../../common/HrCustom';

export interface ListFilterProps extends FormProps {
  filters: React.ReactNode[];
  form: FormInstance;
}

function ListFilter({ filters, form }: ListFilterProps) {
  return (
    <div>
      <Form form={form} layout="vertical" initialValues={{ remember: true }} autoComplete="off">
        <Row gutter={[16, 24]}>
          {filters.map((filter, key) => (
            <Col key={key} xs={24} sm={24} md={12} lg={8} xl={6}>
              <div style={{ padding: '5px' }}>{filter}</div>
            </Col>
          ))}
        </Row>
      </Form>
      <HrCustom />
    </div>
  );
}

export default ListFilter;
