import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFile,faUsersRectangle,faBuilding,faPaste,faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { icon } from '@fortawesome/fontawesome-svg-core';
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
  { label: 'Dashboard', key: 'sub1',path: "/dashboard", icon: <PieChartOutlined />, children: [] },
  { 
    label: 'Account', 
    key: 'sub2', 
    icon: <UserOutlined />, 
    children: [
      { label: 'New Account', key: 'acc1' ,path:"/account/new"},
      { label: 'List Account', key: 'acc2',path: "/account/list" },
    ]
  },
  { label: 'Candidate', key: 'sub3',path: "/Candidate", icon: <FontAwesomeIcon icon={faUsersRectangle} />, children: [
    { label: 'New Candidate', key: 'cd1' ,path:"/new"},
    { label: 'List Candidate', key: 'cd2' },
  ]},
  { 
    label: 'CV', 
    key: 'sub4', 
    icon: <FontAwesomeIcon icon={faFile} />,
    path: "/cv",
    children: [
      { label: 'New CV', key: 'cv1' ,path:"/home"},
      { label: 'List CV', key: 'cv2' },
    ]
  },
  { 
    label: 'Group', 
    key: 'sub5', 
    icon: <TeamOutlined />, 
    children: [
      { label: 'Team 1', key: 'group1' ,path: "/home"},
      { label: 'Team 2', key: 'group2' },
      { label: 'Team 1', key: 'group3' }
    ]
  },
  { label: 'Email Service', key: 'sub6', icon: <FileOutlined />, children: [] },
  {label: 'Company',key: 'sub7',icon: <FontAwesomeIcon icon={faBuilding} />, children: [
      { label: 'New Company', key: 'cp1' ,path: "/add-company"},
      { label: 'List Company', key: 'cp2' ,path: "/list-company"},
  ]},
  {label: 'Job',key: 'sub8',icon: <FontAwesomeIcon icon={faPaste} />, children: 
  [{ label: 'New Job', key: 'j1' ,path: "/add-job"},
    { label: 'List Job', key: 'j2' ,path: "/list-job"},]},
  {label: 'Interview',key: 'sub9',icon: <FontAwesomeIcon icon={faCalendarDays} />, children: [
    { label: 'New Interview', key: 'iv1' ,path: "/add-interview"},
      { label: 'List Interview', key: 'iv2',path: "/list-interview" },
  ]}
];

const items = MenuData.map(data => {

  if (data.children && data.children.length > 0) {
    // Nếu có submenu (children), sinh các item con
    const children = data.children.map(child => getItem((child.path) ? <NavLink to={(data.path) ? data.path + child.path : child.path}>{child.label}</NavLink> : child.label, child.key));
    return getItem(data.label, data.key, data.icon, children);
  }
  // Nếu không có submenu, chỉ sinh item chính
  return getItem((data.path) ? <NavLink to={data.path}>{data.label}</NavLink> : data.label, data.key, data.icon);
  
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