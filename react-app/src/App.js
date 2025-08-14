import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, Dropdown, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Home from './Home';

function App() {
  const userMenu = (
    <Menu>
      <Menu.Item key="1">个人中心</Menu.Item>
      <Menu.Item key="2">退出登录</Menu.Item>
    </Menu>
  );

  const navMenu = (
    <Menu mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/about">关于</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/contact">联系</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="App">
      <Router basename={window.__POWERED_BY_QIANKUN__ ? '/react' : '/'}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px', background: '#001529' }}>
            <Space align="center" size="middle">
              <span style={{ color: 'white' }}>用户昵称</span>
              <Dropdown overlay={userMenu} placement="bottomRight">
                <div style={{ color: 'white', cursor: 'pointer' }}>
                  <UserOutlined /> 个人信息
                </div>
              </Dropdown>
            </Space>
          </div>
          {navMenu}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
