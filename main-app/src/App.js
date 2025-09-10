/* eslint-disable */
import { Layout, Menu, Dropdown, Space, Card, Typography, Statistic, Divider, Avatar } from 'antd';
const { Sider, Content } = Layout;
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { Fragment, useState, useEffect, useRef} from 'react';
import Login from './Login';
import './App.css';
// import microapp state 
import { state, setGlobalState, onGlobalStateChange, offGlobalStateChange } from './MicroAppState';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
const [selectedKey, setSelectedKey] = useState('home');
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const location = useLocation();
const navigate = useNavigate();
  const userMenuItems = [
    { key: '1', label: '个人中心' },
    { 
      key: '2', 
      label: '退出登录',
      onClick: () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }
  ];

  useEffect(() => {
    
    // 根据当前路由设置选中菜单项和全局状态
    const path = location.pathname.replace(/\/$/, ''); // 移除末尾斜杠
    // console.log('path', path);

     if (path === '/app-vue-history') {
      setSelectedKey('vue');
      setGlobalState({ ...state, app: 'vue-app', sidebarVisible: false });
      setSidebarCollapsed(true);
    } else if (path.startsWith('/app-react-history')) {
      setSelectedKey('react');
      setGlobalState({ ...state, app: 'react-app', sidebarVisible: true });
      setSidebarCollapsed(true);
    } else {
      setSelectedKey('home');
      setGlobalState({ ...state, app: 'main-app', sidebarVisible: true });
      setSidebarCollapsed(false);
    }
  }, [location.pathname]);

  // 监听全局状态变化，控制侧边栏显示
  useEffect(() => {
    onGlobalStateChange((newState) => {  
          // 子应用中点击访问主页回主应用
      if(newState && newState.app === 'main-app') {
        // 跳转到首页
        navigate('/');
      }
      if (newState && newState.sidebarVisible !== undefined) {
        setSidebarCollapsed(!newState.sidebarVisible);
      }
      return () => offGlobalStateChange();
    });
    
  }, []);

  return (
    <div className="App">
        {/* 是否登录 */}
        {isLoggedIn ? (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider 
            trigger={null}
            collapsible={true}
            collapsedWidth={sidebarCollapsed?0:200}
            width={sidebarCollapsed ? 0 : 200} 
            collapsed={sidebarCollapsed} 
            style={{ background: '#fff', boxShadow: '2px 0 6px rgba(0, 21, 41, 0.05)' }}>
              <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#1890ff' }}>管理后台</h1>
              </div>
              <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                style={{ borderRight: 0, height: 'calc(100vh - 64px)', overflow: 'auto' }}
                items={[
                  { 
                    key: 'home', 
                    label: '主页',
                    onClick: () => {
                      navigate('/');
                    }
                  },
                  { 
                    key: 'vue', 
                      label: 'vue应用',
                      onClick: () => {
                        navigate('/app-vue-history');
                      }
                  },
                  { 
                    key: 'react', 
                    label: 'react应用',
                    onClick: () => {
                        navigate('/app-react-history');
                    }
                  }
                ]}
              />
            </Sider>
            <Layout>
              <div style={{ padding: '0 20px', background: '#ffffff', height: '64px', display: 'flex', alignItems: 'center' }}>
                 {sidebarCollapsed && (
                   <img
                     src={
                      location.pathname === '/app-vue-history/' ?
                      'https://ts3.tc.mm.bing.net/th/id/ODF.Npfb3Lt5Kweeqbn0AaNM8Q?w=32&h=32&qlt=90&pcl=fffffa&o=6&cb=thwsc4&pid=1.2'
                      :
                      'https://ts3.tc.mm.bing.net/th/id/ODF.uueRzX_Uadnf-upJFewZbQ?w=32&h=32&qlt=90&pcl=fffffa&o=6&cb=thwsc4&pid=1.2'
                      }
                     alt={location.pathname}
                     style={{ height: '40px', marginRight: '20px', cursor: 'pointer' }}
                   />
                 )}
                 <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                   <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '8px 16px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', transition: 'all 0.3s ease' }}>
                     <Avatar size="small" style={{ backgroundColor: '#1890ff', marginRight: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                       {state.userName.charAt(0).toUpperCase()}
                     </Avatar>
                     <Typography.Text style={{ fontWeight: 500, color: '#1f2937', marginRight: '12px' }}>{state.userName}</Typography.Text>
                     <Dropdown
                       menu={{ items: userMenuItems }}
                       placement="bottomRight"
                       trigger={['click']}
                     >
                       <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', transition: 'backgroundColor 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f2f5'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                         <UserOutlined style={{ color: '#40a9ff', marginRight: '8px' }} />
                         <Typography.Text style={{ color: '#40a9ff' }}>个人中心</Typography.Text>
                       </div>
                     </Dropdown>
                   </div>
                 </div>
               </div>
              <Content style={{ minHeight: 280 }}>
                <div id='container'></div>
                <Routes>
                  <Route
                    path="/"
                    element={(
                      <Card style={{ maxWidth: 800, margin: '20px auto', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)', overflow: 'hidden', border: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 128px)', padding: '32px' }}>
                          <DashboardOutlined style={{ fontSize: '64px', color: '#1890ff', marginBottom: '24px', transition: 'transform 0.3s ease', }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                          <Typography.Title level={2} style={{ marginBottom: '16px', background: 'linear-gradient(90deg, #1890ff, #40a9ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2.2rem', fontWeight: 600 }}>欢迎使用管理后台</Typography.Title>
                          <Typography.Text style={{ fontSize: '16px', color: '#4a5568', lineHeight: '1.6', marginBottom: '32px', maxWidth: '600px', display: 'block' }}>
                            高效管理您的应用和数据，提升工作效率
                          </Typography.Text>
                          <Divider style={{ margin: '24px 0' }} />
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', width: '100%', marginTop: '20px' }}>
                            <Card style={{ flex: '1', minWidth: '140px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', borderRadius: '8px', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}><Statistic title="已集成应用" value={2} valueStyle={{ color: '#1890ff' }} /></Card>
                            <Card style={{ flex: '1', minWidth: '140px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', borderRadius: '8px', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}><Statistic title="可用功能" value={10} suffix="+" valueStyle={{ color: '#52c41a' }} /></Card>
                            <Card style={{ flex: '1', minWidth: '140px', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', borderRadius: '8px', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}><Statistic title="系统通知" value={0} valueStyle={{ color: '#faad14' }} /></Card>
                          </div>
                        </div>
                      </Card>
                    )}
                  />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        ) : (
          <Fragment>
            <Login onLogin={(token) => {
              localStorage.setItem('token', token);
              setIsLoggedIn(true);
            }} />
          </Fragment>
        )}
      
    </div>
  );
}

export default App;
