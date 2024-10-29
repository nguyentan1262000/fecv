import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFile,faUsersRectangle,faBuilding,faPaste,faCalendarDays,faGear} from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb, Layout, Menu, theme , Button ,Dropdown, Modal} from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { requestLogout } from '../../services/authAPI';
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
    path: "/account/list",
    icon: <UserOutlined />
  },
  { label: 'Candidate', key: 'sub3',path: "/candidate", icon: <FontAwesomeIcon icon={faUsersRectangle} />},
  { 
    label: 'CV', 
    key: 'sub4', 
    icon: <FontAwesomeIcon icon={faFile} />,
    path: "/cv"
  },
  { 
    label: 'Group', 
    key: 'sub5', 
    icon: <TeamOutlined />,
    path: "/group"
  },
  { label: 'Email Service', key: 'sub6',path: "/services", icon: <FileOutlined />, children: [] },
  {label: 'Company',key: 'sub7',path: "/company",icon: <FontAwesomeIcon icon={faBuilding} />},
  {label: 'Job',key: 'sub8',path: "/job",icon: <FontAwesomeIcon icon={faPaste} />},
  {label: 'Interview',key: 'sub9',path: "/interview",icon: <FontAwesomeIcon icon={faCalendarDays} />}
];

const itemMenu = MenuData.map(data => {

  if (data.children && data.children.length > 0) {
    // Nếu có submenu (children), sinh các item con
    const children = data.children.map(child => getItem((child.path) ? <NavLink to={(data.path) ? data.path + child.path : child.path}>{child.label}</NavLink> : child.label, child.key));
    return getItem(data.label, data.key, data.icon, children);
  }
  // Nếu không có submenu, chỉ sinh item chính
  return getItem((data.path) ? <NavLink to={data.path}>{data.label}</NavLink> : data.label, data.key, data.icon);
  
});

const items = [
  {
    key: '1',
    label: (
      <NavLink to="/account/profile">
        Profile
      </NavLink>
    )
  },
  {
    key: '2',
    label: (
      <NavLink to="https://www.antgroup.com">
        Change Password
      </NavLink>
    )
  },
];

const layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();

    const handleLogout = async () => {
      const res = await requestLogout();
      if(res.data.status == 200){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("id");
        navigate("/login");
      }else{
        alert("logout that bai");
      }
      
    }

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
        <Menu className='menu-homepage' theme="dark" defaultSelectedKeys={['1']} mode="inline" items={itemMenu} />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className='header-layout'
        >
          <Dropdown menu={{items,}} trigger={['click']} placement="bottom">
            <FontAwesomeIcon className='text-[20px] cursor-pointer' icon={faGear} />
          </Dropdown>

          <Button onClick={handleLogout}>Logout</Button>
        </Header>
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