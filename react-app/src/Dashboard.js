import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, BarChartOutlined } from '@ant-design/icons';

const Dashboard = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h2>仪表盘</h2>
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={11284}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="订单总数"
              value={9326}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总收入"
              value={112893}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="增长率"
              value={9.3}
              prefix={<BarChartOutlined />}
              precision={2}
              valueStyle={{ color: '#722ed1' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Card title="最近活动" bordered={false}>
            <p>用户张三购买了商品A</p>
            <p>用户李四提交了新的订单</p>
            <p>系统进行了数据备份</p>
            <p>新的产品版本已发布</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="系统状态" bordered={false}>
            <p>CPU 使用率: 45%</p>
            <p>内存使用率: 68%</p>
            <p>磁盘空间: 1.2TB / 2TB</p>
            <p>网络状态: 正常</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;