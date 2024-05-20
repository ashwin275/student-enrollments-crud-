"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar } from 'antd';

const { Header, Sider, Content } = Layout;

const HomeLayout: React.FC = ({ children }: any) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ name: '', email: '' });

  useEffect(() => {

    const credentials = JSON.parse(localStorage.getItem('credential') || '{}');
    setUserCredentials(credentials);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('credential');
    router.replace('/');
  };

  const { name, email } = userCredentials;

  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ padding: '16px', background: '#001529;', color:"#fff", borderBottom: '1px solid #f0f0f0' }}>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Avatar style={{ marginRight: '8px' }} icon={<UserOutlined />} />
              <div>
                <div style={{ fontWeight: 'bold' }}>{name}</div>
                <div>{email}</div>
              </div>
            </div>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              Students
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Instructors
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: '#fff',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
