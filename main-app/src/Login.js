import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { setGlobalState } from './MicroAppState'
const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // 模拟登录请求
    setTimeout(() => {
      const token = Math.random().toString(36).substring(2); // 随机生成 token
      localStorage.setItem('token', token); // 存储 token
      onLogin(token);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: 300 }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;