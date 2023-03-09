import React, { FC } from 'react';
import { Tabs } from 'antd';

import './page-header.css';

const { TabPane } = Tabs;

interface PageHeaderProps {
  onTogleTab?: (key: string) => void;
}

const PageHeader: FC<PageHeaderProps> = ({ onTogleTab = () => {} }) => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <header className="header">
      <Tabs defaultActiveKey="1" centered size="large" onChange={onTogleTab}>
        <TabPane tab="Search" key="search" />
        <TabPane tab="Rated" key="rated" />
      </Tabs>
    </header>
  );
};

export default PageHeader;
