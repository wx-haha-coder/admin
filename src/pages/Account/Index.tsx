import React from 'react';
import { Tabs, Card } from 'antd';

const { TabPane } = Tabs;

const Index: React.FC<{}> = (props) => {
  const tabConfig = {
    tabPosition: 'left',
    defaultActiveKey: 'index',
  };

  return (
    <Card>
      <Tabs tabPosition="left" defaultActiveKey="index" animated={false}>
        <TabPane tab="个人信息" key="index">
          个人信息
        </TabPane>
        <TabPane tab="关联设置" key="releated">
          关联设置
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Index;
