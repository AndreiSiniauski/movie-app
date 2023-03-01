import React from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

import './page-header.css';

const { TabPane } = Tabs;

function PageHeader({ onTogleTab }) {
  return (
    <header className="header">
      <Tabs defaultActiveKey="1" centered size="large" onChange={onTogleTab}>
        <TabPane tab="Search" key="search" />;
        <TabPane tab="Rated" key="rated" />;
      </Tabs>
    </header>
  );
}
export default PageHeader;

PageHeader.defaultProps = {
  onTogleTab: () => {},
};

PageHeader.propTypes = {
  onTogleTab: PropTypes.func,
};
