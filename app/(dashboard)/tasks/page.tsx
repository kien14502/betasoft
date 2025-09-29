'use client';
import { Col, Row } from 'antd';
import React from 'react';
import TaskList from './TaskList';
import TaskKanban from './TaskPannel';
import ModalAddTask from './ModalAddTask';

const TaskPage = () => {
  return (
    <>
      <Row style={{ position: 'relative', flex: 1, background: 'transparent' }}>
        <Col xs={0} sm={0} md={4} lg={4} xl={4} xxl={4}>
          <TaskList />
        </Col>
        <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={20} style={{ height: '100%' }}>
          <TaskKanban />
        </Col>
      </Row>
      <ModalAddTask />
    </>
  );
};

export default TaskPage;
