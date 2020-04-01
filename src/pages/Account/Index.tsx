import React, { useEffect, useState } from 'react';
import { Tabs, Card, Form, Input, Avatar } from 'antd';
import { connect, history } from 'umi';
import { ConnectFixProps } from '@/types/router';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';

interface PageProps extends ConnectFixProps {
  currentUser?: CurrentUser;
}

const { TabPane } = Tabs;

const Index: React.FC<PageProps> = (props) => {
  const {
    location: { query },
    currentUser,
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

  //
  const AccountData = () => {
    if (currentUser) {
      return (
        <div>
          <p>{currentUser.name}</p>
          <p>{currentUser.email}</p>
          <p>{currentUser.phone}</p>
          <p>
            <Avatar src={currentUser.avatar} />
          </p>
          <p>{currentUser.name}</p>
          <p>{currentUser.gender}</p>
          <p>{currentUser.github_name}</p>
          <p>{currentUser.github_url}</p>
          <p>{currentUser.github_avatar}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card style={{ margin: 20 }}>
      <Tabs
        tabPosition="left"
        activeKey={activeKey || 'index'}
        animated={false}
        onChange={handleChangeTab}
      >
        <TabPane tab="个人信息" key="index">
          <AccountData />
        </TabPane>
        <TabPane tab="关联设置" key="settings">
          关联设置
        </TabPane>
      </Tabs>
    </Card>
  );
};

const mapStateProps = ({ user }: ConnectState) => ({
  currentUser: user.currentUser,
});
export default connect(mapStateProps)(Index);
