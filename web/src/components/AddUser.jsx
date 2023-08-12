import React,{useState} from "react";
import { Form, Input, Button, InputNumber, App, Typography } from "antd";

const AddUser = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const formData = form.getFieldsValue();
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      if(data.message){
        message.error(data.message)
      }
    } catch (error) {
      message.error("Error trying to add new User.");
      setLoading(false);
      return
    }
    setLoading(false);
    form.resetFields()
    message.success("User Added Successfully");
  };
  return (
    <Form
      form={form}
      autoComplete="off"
      layout="vertical"
      style={{
        maxWidth: 300,
        margin: "0 auto",
      }}
      onFinish={handleSubmit}
    >
        <Typography.Title level={2} style={{textAlign:"center"}}>Add User</Typography.Title>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please input User's First name.",
          },
        ]}
      >
        <Input placeholder="e.g. John" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Please input User's Last name.",
          },
        ]}
      >
        <Input placeholder="e.g. Doe" />
      </Form.Item>

      <Form.Item
        label="Initial Balance"
        name="balance"
        rules={[
          {
            required: true,
            message: "Please enter an initial balance for the User.",
          },
        ]}
      >
        <InputNumber
          placeholder="e.g. 300"
          addonAfter="Tocos"
          style={{ width: "100%" }}
          min={1}
          max={9999}
        />
      </Form.Item>

      <Form.Item>
        <Button loading={loading} style={{ width: "100%" }} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUser;
