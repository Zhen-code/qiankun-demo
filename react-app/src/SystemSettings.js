import React, { useState } from 'react';
import { Card, Form, Input, Switch, Button, Select, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { Option } = Select;

const SystemSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // 模拟保存操作
    setTimeout(() => {
      setLoading(false);
      message.success('设置保存成功');
      console.log('保存的设置:', values);
    }, 1000);
  };

  const initialValues = {
    siteName: '管理系统',
    siteDescription: '一个功能强大的后台管理系统',
    enableRegistration: true,
    theme: 'light',
    language: 'zh-CN',
    pageSize: 20,
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>系统设置</h2>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Card title="基本设置" style={{ marginBottom: 24 }}>
          <Form.Item label="网站名称" name="siteName">
            <Input placeholder="请输入网站名称" />
          </Form.Item>
          
          <Form.Item label="网站描述" name="siteDescription">
            <Input.TextArea 
              placeholder="请输入网站描述" 
              rows={3}
            />
          </Form.Item>
          
          <Form.Item label="启用用户注册" name="enableRegistration" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Card>

        <Card title="界面设置" style={{ marginBottom: 24 }}>
          <Form.Item label="主题" name="theme">
            <Select>
              <Option value="light">浅色主题</Option>
              <Option value="dark">深色主题</Option>
              <Option value="auto">自动</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="语言" name="language">
            <Select>
              <Option value="zh-CN">简体中文</Option>
              <Option value="en-US">English</Option>
              <Option value="ja-JP">日本語</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="每页显示数量" name="pageSize">
            <Select>
              <Option value={10}>10条</Option>
              <Option value={20}>20条</Option>
              <Option value={50}>50条</Option>
              <Option value={100}>100条</Option>
            </Select>
          </Form.Item>
        </Card>

        <Card title="通知设置">
          <Form.Item label="邮件通知" name="emailNotifications" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item label="短信通知" name="smsNotifications" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item label="推送通知" name="pushNotifications" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Card>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />}
            loading={loading}
            size="large"
          >
            保存设置
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SystemSettings;