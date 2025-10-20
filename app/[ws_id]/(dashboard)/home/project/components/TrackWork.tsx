import { RequestTaskListDataToCreate } from '@/app/api/generated.schemas';
import { Button as ButtonCustom } from '@/components/common/Button';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Space, Input, Button, ColorPicker, Select } from 'antd';

type Props = {
  onFinish: (tasks_list: RequestTaskListDataToCreate[]) => void;
};

const TrackWork: React.FC<Props> = ({ onFinish }) => {
  const onSubmit = (values: { tasks_list: RequestTaskListDataToCreate[] }) => {
    onFinish(values.tasks_list);
  };
  return (
    <div>
      <p>HOW DO YOU TRACK WORK?</p>
      <span>Once work is submitted, it advances through these defined statuses.</span>
      <Form name="tasks_list" onFinish={onSubmit} style={{ maxWidth: 600 }} autoComplete="off">
        <Form.List name="tasks_list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'desciption']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                  >
                    <Input placeholder="Description" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'is_default']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                  >
                    <Select placeholder="Set default" allowClear>
                      <Select value={true}>Yes</Select>
                      <Select value={false}>No</Select>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'color']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                    getValueFromEvent={(colorObject) => colorObject.toHexString()}
                  >
                    <ColorPicker />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <span>Don’t worry, you can change the status then.</span>
        <Form.Item>
          <div className="flex items-center gap-4">
            <ButtonCustom type="button" variant="outline">
              Cancel
            </ButtonCustom>
            <ButtonCustom type="submit" className="flex-1" variant="primary">
              Finish
            </ButtonCustom>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default TrackWork;
