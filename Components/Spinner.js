import React from 'react';
import { Alert, Space, Spin } from 'antd';

const Spinner = () => (
    <Space size="middle">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
    </Space>
);

export default Spinner;