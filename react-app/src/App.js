import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import SystemSettings from './SystemSettings';

const { Header, Sider, Content } = Layout;

function App() {
  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <Link 
        to="/" 
        onClick={(e) => {
          // 点击事件处理逻辑
          
          // 如果是在微前端环境中，执行特殊逻辑
          if (window.__POWERED_BY_QIANKUN__) {
            e.preventDefault();
            window.setGlobalState({
               sidebarVisible: true,
                app: 'main-app',
            });
            
          }
        }}
      >
        首页
      </Link>
    },
    {
      key: '2',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">仪表盘</Link>
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: <Link to="/users">用户管理</Link>
    },
    {
      key: '4',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/orders">订单管理</Link>
    },
    {
      key: '5',
      icon: <SettingOutlined />,
      label: <Link to="/settings">系统设置</Link>
    }
  ];

  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? '/app-react-history' : '/'}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          defaultCollapsed={false}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          {!window.__POWERED_BY_QIANKUN__ && (
            <div style={{ 
              height: 32, 
              margin: 16, 
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              管理系统
            </div>
          )}
          <Menu 
            theme="dark" 
            defaultSelectedKeys={['2']} 
            mode="inline" 
            items={menuItems} 
          />
        </Sider>
        
        <Layout style={{ marginLeft: 200 }}>
          {!window.__POWERED_BY_QIANKUN__ && (
            <Header style={{ 
              padding: 0, 
              background: '#fff',
              boxShadow: '0 1px 4px rgba(0,21,41,.08)'
            }}>
              <div style={{ 
                padding: '0 24px',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1890ff'
              }}>
                后台管理系统
              </div>
            </Header>
          )}
          
          <Content style={{ 
            margin: '24px 16px', 
            padding: 24, 
            background: '#fff',
            minHeight: 280,
          }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/settings" element={<SystemSettings />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
