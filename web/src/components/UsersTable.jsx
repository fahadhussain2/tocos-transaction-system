import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
        const fetchedUsers = await res.json();
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return;
      }
    };
    getUsers();
  }, []);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text) => <>{text} Tocos</>
    },
    {
        title: "Details",
        dataIndex: "_id",
        render: (text) => <Link to={`/user/${text}`}>View Details</Link>,
      },
  ];

  if (users)
    return (
      <Table
        loading={loading}
        style={{ width: "100%" }}
        scroll={{ x: 300 }}
        rowKey="_id"
        dataSource={users}
        columns={columns}
      />
    );
};

export default UsersTable;
