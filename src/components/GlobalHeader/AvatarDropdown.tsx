import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin, Modal } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import { history, ConnectProps, connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;
    if (key === 'logout') {
      Modal.confirm({
        title: '确认要退出？',
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
          const { dispatch } = this.props;
          if (dispatch) {
            dispatch({
              type: 'login/logout',
            });
          }
        },
      });
      return;
    }
    switch (key) {
      case 'index':
        history.push('/account');
        return;
      default:
        history.push(`/account?tab=${key}`);
    }
  };

  render(): React.ReactNode {
    const { currentUser, menu } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="index">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return currentUser && currentUser.login ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size={36} className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={styles.name}>{currentUser.name || currentUser.nickname }</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
