import { Menu, Dropdown, Space } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate, Link,  } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Fragment, useState, useEffect, useRef} from 'react';
import Login from './Login';
import './App.css';
import { state, setGlobalState } from './MicroAppState';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
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
  const refDom = useRef(null);
  useEffect(() => {
    return () => {
      if(refDom.current) {
        refDom.current = null
      } 
      refDom.current && refDom.current.unmount()
    }
  }, [])
  return (
    <div className="App">
       <Router>     
        <div style={{ display: (isLoggedIn ? 'flex':'none'), justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', background: '#ffffff' }}>
                    <Menu mode="horizontal" style={{ flex: 1 }}>
                    <Menu.Item key="home">
                        <Link to="/">主页</Link>
                      </Menu.Item>
                      <Menu.Item key="vue">
                        <a href="/vue" 
                          // onClick={(e) => {
                          //   // e.preventDefault();
                          //   console.log(state)
                          //   setGlobalState(state)
                            // window.history.pushState({}, '', '/vue');
                            // refDom.current = loadMicroApp({
                            //   name: 'vueApp',
                            //   entry: '//localhost:8080',
                            //   container: '#container',
                            // });
                          // }}
                        >vue</a>
                      </Menu.Item>
                      <Menu.Item key="react">
                        <a href="/react" 
                          // onClick={(e) => {
                          //   // 禁止a标签直接跳转，改为修改history再加载微应用
                          //   e.preventDefault();
                          //   window.history.pushState({}, '', '/react');
                          //   refDom.current = loadMicroApp({
                          //     name: 'reactApp',
                          //     entry: '//localhost:3001',
                          //     container: '#container',
                          //   });
                          // }}
                        >react</a>
                      </Menu.Item>
                    </Menu>
                    <Space align="center" size="middle">
                      <span style={{ color: '#000000' }}>用户昵称</span>
                      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                        <div style={{ color: '#000000', cursor: 'pointer' }}>
                          <UserOutlined /> 个人信息
                        </div>
                      </Dropdown>
                    </Space>
        </div>
        <div id='container'></div>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? (
              <h1 className='welcome'>{isLoggedIn ? '欢迎，已登录' : '未登录，请先登录'}</h1>
            ) : (
             <Fragment>
               <Login onLogin={(token) => {
                localStorage.setItem('token', token);
                setIsLoggedIn(true);
              }} />
             </Fragment>
            )}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
