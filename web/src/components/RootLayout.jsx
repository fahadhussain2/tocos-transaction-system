import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TransactionOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Typography } from "antd";
const { Header, Sider, Content } = Layout;
const RootLayout = () => {
  // const { push } = useRouter();
  const path = useLocation().pathname.split("/")[1];

  const [active, setActive] = useState(path);
  useEffect(() => {
    path.length > 0 ? setActive(path) : setActive("1");
  }, [path]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }} className="root-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "20px",
            color: "white",
            width: 78,
            height: 64,
            textAlign: "center",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultActiveFirst={"1"}
          selectedKeys={[active]}
          onClick={(item) => setActive(item.key)}
          items={[
            {
              key: "1",
              icon: <UsergroupAddOutlined />,
              label: <NavLink to="/">Users</NavLink>,
            },
            {
              key: "add-user",
              icon: <UserAddOutlined />,
              label: <NavLink to="/add-user">Add User</NavLink>,
            },
            {
              key: "add-transaction",
              icon: <TransactionOutlined />,
              label: <NavLink to="/add-transaction">Add Transaction</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign: "center",
          }}
        >
          <Typography.Title level={3}>Tocos Trading Platform</Typography.Title>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default RootLayout;
