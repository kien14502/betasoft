'use client';
import { Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';
import { Task } from './(kanban)/KanbanBoard';
import { v4 as uuidv4 } from 'uuid';
import { actions, useStore } from '@/store';

export type TModeModalTask = 'add' | 'edit';

interface IModalAddTaskProps {
  stateTask?: string;
  mode?: TModeModalTask;
}

const ModalAddTask = ({}: IModalAddTaskProps) => {
  const [{ kanban }, dispatch] = useStore();
  const [form] = useForm();
  const { isActiveModalAddTask, stateTask, modeTask, task } = kanban;

  useEffect(() => {
    stateTask && form.setFieldsValue({ state: stateTask });
    task && form.setFieldsValue(task);
  }, [stateTask, task]);

  const handleOk = async () => {
    try {
      switch (modeTask) {
        case 'add':
          await form.validateFields();
          const newTask: Task = form.getFieldsValue();
          newTask.key = uuidv4();
          dispatch(actions.addTask(newTask));
          dispatch(actions.setActiveModalAddTask(false));
          form.resetFields();
        case 'edit':
          await form.validateFields();
          dispatch(actions.setTask(undefined));
          form.resetFields();
          dispatch(actions.setActiveModalAddTask(false));
        default:
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleCancel = () => {
    dispatch(actions.setTask(undefined));
    dispatch(actions.setActiveModalAddTask(false));
    form.resetFields();
  };

  const modeName = modeTask.charAt(0).toUpperCase() + modeTask.slice(1);
  return (
    <Modal
      title={`${modeName} Task`}
      closable={{ 'aria-label': 'Cancel' }}
      open={isActiveModalAddTask}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} initialValues={{ state: 'todo' }}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input title!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="State" name="state">
          <Select
            options={[
              { label: 'To do', value: 'todo' },
              { label: 'Pending', value: 'pending' },
              { label: 'Done', value: 'done' },
            ]}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddTask;
