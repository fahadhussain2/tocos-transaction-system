import React, { useState, useEffect } from "react";
import { Form, Select, Typography, Button, InputNumber, App } from "antd";

const AddTransaction = () => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableSenders, setAvailableSenders] = useState([]);
  const [availableReceivers, setAvailableReceivers] = useState([]); // To store filtered receiver options

  const [form] = Form.useForm();
  const { message } = App.useApp();
  useEffect(() => {
    const getUsers = async () => {
      setUsersLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
        const fetchedUsers = await res.json();
        const userOptions = fetchedUsers.map((u) => ({
          label: `${u.firstName} ${u.lastName}`,
          value: u._id,
        }));
        setUsers(userOptions);
        setAvailableSenders(userOptions);
        setAvailableReceivers(userOptions);
      } catch (error) {
        setUsersLoading(false);
        return;
      }
      setUsersLoading(false);
    };
    getUsers();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = form.getFieldsValue();
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      if(data.message){
        message.error(data.message)
        setLoading(false);
        return;
      }
    } catch (error) {
      message.error("Error trying to add new Transaction.");
      setLoading(false);
      return;
    }
    setLoading(false);
    form.resetFields();
    message.success("Transaction created Successfully.");
  };

  const handleSenderChange = (senderId) => {
    // Update available receivers by filtering out the selected sender
    setAvailableReceivers(users.filter((user) => user.value !== senderId));
  };

  const handleReceiverChange = (receiverId) => {
    // Update available senders by excluding the selected receiver
    setAvailableSenders(users.filter((user) => user.value !== receiverId));
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
    <Typography.Title level={2} style={{textAlign:"center"}}>Add Transaction</Typography.Title>
      <Form.Item
        label="Sender"
        name="senderId"
        rules={[
          {
            required: true,
            message: "Please select a sender.",
          },
        ]}
      >
        <Select
          placeholder="Select Sender"
          onChange={handleSenderChange}
          options={availableSenders}
          loading={usersLoading}
        />
      </Form.Item>

      <Form.Item
        label="Receiver"
        name="receiverId"
        rules={[
          {
            required: true,
            message: "Please select a receiver.",
          },
        ]}
      >
        <Select
          placeholder="Select Receiver"
          onChange={handleReceiverChange}
          options={availableReceivers}
          loading={usersLoading}
        />
      </Form.Item>

      <Form.Item
        placeholder="e.g. 100"
        label="Amount to Send"
        name="amount"
        rules={[
          {
            required: true,
            message: "Please enter some amount to send.",
          },
        ]}
      >
        <InputNumber
          placeholder="e.g. 500"
          addonAfter="Tocos"
          style={{ width: "100%" }}
          min={1}
          max={9999}
        />
      </Form.Item>

      <Form.Item>
        <Button
          loading={loading}
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTransaction;
