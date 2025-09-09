import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const users = [
    {
      key: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      role: '管理员',
      status: '活跃',
      createTime: '2024-01-15',
    },
    {
      key: '2',
      name: '李四',
      email: 'lisi@example.com',
      role: '用户',
      status: '活跃',
      createTime: '2024-01-20',
    },
    {
      key: '3',
      name: '王五',
      email: 'wangwu@example.com',
      role: '用户',
      status: '禁用',
      createTime: '2024-02-01',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (user) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户 ${user.name} 吗？`,
      onOk() {
        message.success('用户删除成功');
      },
    });
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    message.success(editingUser ? '用户更新成功' : '用户添加成功');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>用户管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加用户
        </Button>
      </div>
      
      <Table columns={columns} dataSource={users} />

      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="姓名" required>
            <Input defaultValue={editingUser?.name} />
          </Form.Item>
          <Form.Item label="邮箱" required>
            <Input defaultValue={editingUser?.email} />
          </Form.Item>
          <Form.Item label="角色">
            <Input defaultValue={editingUser?.role} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;