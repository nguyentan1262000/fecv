import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MenuData = [
  { label: 'Dashboard', key: '1', icon: <PieChartOutlined />, children: [] },
  { label: 'Conputer', key: '2', icon: <DesktopOutlined />, children: [] },
  { 
    label: 'Account', 
    key: 'sub1', 
    icon: <UserOutlined />, 
    children: [
      { label: 'Tom', key: '3' },
      { label: 'Bill', key: '4' },
      { label: 'Alex', key: '5' }
    ]
  },
  { 
    label: 'Group', 
    key: 'sub2', 
    icon: <TeamOutlined />, 
    children: [
      { label: 'Team 1', key: '6' },
      { label: 'Team 2', key: '8' },
      { label: 'Team 1', key: '10' },
      { label: 'Team 2', key: '11' },
      { label: 'Team 1', key: '12' },
      { label: 'Team 2', key: '13' },
      { label: 'Team 1', key: '14' },
      { label: 'Team 2', key: '15' },
    ]
  },
  { label: 'Email Service', key: '9', icon: <FileOutlined />, children: [] }
];

const items = MenuData.map(data => {
  if (data.children && data.children.length > 0) {
    // Nếu có submenu (children), sinh các item con
    const children = data.children.map(child => getItem(child.label, child.key));
    return getItem(data.label, data.key, data.icon, children);
  }
  // Nếu không có submenu, chỉ sinh item chính
  return getItem(data.label, data.key, data.icon);
});


const layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  return (
    <div className="container">
        <Layout
        className='layout'
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu className='menu-homepage' theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          className='mx-[16px]'
        >
          <Breadcrumb className='my-[16px]'>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className='h-full p-[24px] min-h-[360px] bg-white rounded-[5px]'
          >
            <Outlet/>
          </div>
        </Content>
        <Footer
          className='text-center'
        >
          CV Managemen Version 1.0.0 ©2024 Created by An
        </Footer>
      </Layout>
    </Layout>
    </div>
    
  );
};

export default layout;