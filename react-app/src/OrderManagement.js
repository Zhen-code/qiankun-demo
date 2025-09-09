import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const OrderManagement = () => {
  const orders = [
    {
      key: '1',
      orderNo: 'ORD001',
      customer: '张三',
      amount: 299.00,
      status: '已完成',
      createTime: '2024-01-15 10:30',
      products: ['商品A', '商品B'],
    },
    {
      key: '2',
      orderNo: 'ORD002',
      customer: '李四',
      amount: 156.50,
      status: '处理中',
      createTime: '2024-01-16 14:20',
      products: ['商品C'],
    },
    {
      key: '3',
      orderNo: 'ORD003',
      customer: '王五',
      amount: 899.00,
      status: '待付款',
      createTime: '2024-01-17 09:15',
      products: ['商品D', '商品E', '商品F'],
    },
    {
      key: '4',
      orderNo: 'ORD004',
      customer: '赵六',
      amount: 450.00,
      status: '已取消',
      createTime: '2024-01-18 16:45',
      products: ['商品G'],
    },
  ];

  const statusColors = {
    '待付款': 'orange',
    '处理中': 'blue',
    '已完成': 'green',
    '已取消': 'red',
  };

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount.toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status]}>
          {status}
        </Tag>
      ),
    },
    {
      title: '商品',
      dataIndex: 'products',
      key: 'products',
      render: (products) => products.join(', '),
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
          <Button type="link" icon={<EyeOutlined />}>
            查看详情
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2>订单管理</h2>
      <Table 
        columns={columns} 
        dataSource={orders} 
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OrderManagement;