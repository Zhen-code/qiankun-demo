import { Button, Form, Input, Card, Typography } from 'antd';
import { useState } from 'react';
import { setGlobalState } from './MicroAppState';
import './Login.css';

const { Title } = Typography;
const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // 模拟登录请求
    setTimeout(() => {
      const token = Math.random().toString(36).substring(2); // 随机生成 token
      localStorage.setItem('token', token); // 存储 token
      setGlobalState('token', token);
      onLogin(token);
      setLoading(false);
      console.log('登录成功', token);
      
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <Card className="login-card" shadow="lg">
          <div className="login-header">
            <Title level={3} className="login-title">用户登录</Title>
          </div>
          
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="login-form"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
                { whitespace: true, message: '用户名不能为空' }
              ]}
              className="login-form-item"
            >
              <Input 
                size="large" 
                placeholder="请输入用户名"
                className="login-input"
                prefix={<UserOutlined className="login-input-prefix" />}
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码长度不能少于6位' }
              ]}
              className="login-form-item"
            >
              <Input.Password 
                size="large" 
                placeholder="请输入密码"
                className="login-input"
                prefix={<LockOutlined className="login-input-prefix" />}
              />
            </Form.Item>

            <Form.Item className="login-form-item">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                block 
                size="large"
                className="login-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

// 导入图标组件
const UserOutlined = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8ZM8 10C5.33333 10 1 11 1 13V14H15V13C15 11 10.6667 10 8 10Z" fill="currentColor" />
    </svg>
  );
};

const LockOutlined = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M11.7999 5.49998H11.2999V4.19998C11.2999 2.49998 9.99988 1.19998 8.29988 1.19998C6.59988 1.19998 5.29998 2.49998 5.29998 4.19998V5.49998H4.79998C3.79998 5.49998 2.99988 6.39998 2.99988 7.39998V13.4C2.99988 14.4 3.79998 15.2 4.79998 15.2H11.7999C12.7999 15.2 13.6 14.4 13.6 13.4V7.39998C13.6 6.39998 12.7999 5.49998 11.7999 5.49998ZM8.29988 1.89998C9.39988 1.89998 10.3 2.8 10.3 4.19998V5.49998H6.29998V4.19998C6.29998 2.8 7.19988 1.89998 8.29988 1.89998ZM12.9 13.4V7.39998H3.59998V13.4C3.59998 13.8999 3.99998 14.3 4.49998 14.3H11.9C12.4 14.3 12.9 13.8999 12.9 13.4Z" fill="currentColor" />
    </svg>
  );
};

export default Login;