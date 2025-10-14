import { List } from 'antd';
import React from 'react';
import styles from './tasks.module.css';
import { CheckSquareOutlined, PlusOutlined } from '@ant-design/icons';

const TaskList = () => {
  return (
    <List
      className={styles['list-scroll']}
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Task List</div>
          <div>
            <PlusOutlined style={{ cursor: 'pointer' }} />
          </div>
        </div>
      }
      dataSource={[
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
        'Los Angeles battles huge wildfires.',
        'Los Angeles battles huge wildfires.',
        'Los Angeles battles huge wildfires.',
        'Los Angeles battles huge wildfires.',
      ]}
      renderItem={(item) => (
        <List.Item className={`${styles['task-item']}`}>
          <div>
            <div
              style={{
                borderRadius: '5px',
                backgroundColor: '#c2c2c2ff',
                padding: '3px',
                width: '30px',
                textAlign: 'center',
              }}
            >
              <CheckSquareOutlined />
            </div>
          </div>
          <div className={`${styles['task-title']}`}>{item}</div>
        </List.Item>
      )}
    />
  );
};

export default TaskList;
