import { Form, Input, Typography } from "antd";
const { TextArea } = Input;
const { Text } = Typography;

const EditableField = ({
  name,
  label,
  isEditing,
  placeholder,
  rules = [],
  type = "input",
  form,
  defaultValue = "",
}) => {
  const Component = type === "textarea" ? TextArea : Input;

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <Form.Item
        name={name}
        style={{
          flex: 1,
          marginBottom: 0,
          display: isEditing ? "block" : "none",
        }}
        rules={rules}
      >
        <Component placeholder={placeholder} />
      </Form.Item>

      {!isEditing && (
        <div style={{ flex: 1 }}>
          <Text strong>{label}:</Text>
          <Text style={{ marginLeft: 8 }}>
            {form.getFieldValue(name) || defaultValue || "未设置"}
          </Text>
        </div>
      )}
    </div>
  );
};

export default EditableField;
