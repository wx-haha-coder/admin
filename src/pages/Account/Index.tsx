import React, { useEffect, useState } from 'react';
import { Tabs, Card } from 'antd';
import { connect, history } from 'umi';
import { ConnectFixProps } from '@/types/router';

interface PageProps extends ConnectFixProps {}

const { TabPane } = Tabs;

const Index: React.FC<PageProps> = (props) => {
  const {
    location: { query },
  } = props;

  const [activeKey, setActiveKey] = useState<string>();

  useEffect(() => {
    setActiveKey(query.tab);
  }, [query]);

  // 切换Tab
  const handleChangeTab: (key: string) => void = (key) => {
    const tab = key === 'index' ? '' : `?tab=${key}`;
    history.replace(`/account/${tab}`);
  };

  return (
    <Card>
      <Tabs
        tabPosition="left"
        activeKey={activeKey || 'index'}
        animated={false}
        onChange={handleChangeTab}
      >
        <TabPane tab="个人信息" key="index">
          个人信息
        </TabPane>
        <TabPane tab="关联设置" key="settings">
          关联设置
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default connect()(Index);
