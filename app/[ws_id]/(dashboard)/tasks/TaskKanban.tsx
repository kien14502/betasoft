import { OrderedListOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import React from 'react';
import styles from './tasks.module.css';
import KanbanBoard from './(kanban)/KanbanBoard';

const TaskKanban = () => {
  return (
    <div style={{ height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
        <div style={{ fontWeight: 600 }}>
          <OrderedListOutlined /> List
        </div>
        <div>
          <Input
            placeholder="Search..."
            variant="filled"
            style={{ backgroundColor: '#ffff', borderRadius: 15 }}
            prefix={<SearchOutlined style={{ color: '#697178' }} />}
          />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Row className={`${styles['select-filter']}`}>
            <Col span={24}>
              <label htmlFor="filter" className={`${styles['select-filter-label']}`}>
                Filter
              </label>
            </Col>
            <Col span={24}>
              <select id="filter" name="filter" className={`${styles['select-filter-item']}`}>
                <option value="category">Category</option>
                <option value="priority">Priority</option>
              </select>
            </Col>
          </Row>

          <Row className={`${styles['select-filter']}`}>
            <Col span={24}>
              <label htmlFor="filter" className={`${styles['select-filter-label']}`}>
                Short by
              </label>
            </Col>
            <Col span={24}>
              <select id="sortBy" name="sortBy" className={`${styles['select-filter-item']}`}>
                <option value="category">Time date</option>
                <option value="priority">Create date</option>
              </select>
            </Col>
          </Row>

          <Row className={`${styles['select-filter']}`}>
            <Col span={24}>
              <label htmlFor="status" className={`${styles['select-filter-label']}`}>
                Status
              </label>
            </Col>
            <Col span={24}>
              <select id="status" name="status" className={`${styles['select-filter-item']}`}>
                <option value="category">OnGoing</option>
                <option value="priority">Pedding</option>
                <option value="priority">Done</option>
              </select>
            </Col>
          </Row>

          <Row className={`${styles['select-filter']}`}>
            <Col span={24}>
              <label htmlFor="customize" className={`${styles['select-filter-label']}`}>
                Customize
              </label>
            </Col>
            <Col span={24}>
              <select id="customize" name="customize" className={`${styles['select-filter-item']}`}>
                <option value="category">Assign by</option>
                <option value="priority">Create by</option>
              </select>
            </Col>
          </Row>
        </div>
      </div>
      <div style={{ height: '100%', backgroundColor: 'white' }}>
        <KanbanBoard />
      </div>
    </div>
  );
};

export default TaskKanban;
