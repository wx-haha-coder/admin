import React, { useEffect, useState } from 'react';
import { Tabs, Card, Form, Input, Avatar, Button, Radio, Upload } from 'antd';
import { connect, history } from 'umi';
import { ConnectFixProps } from '@/types/router';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { fetchRegions } from '@/services/region';
import css from './Index.less';

interface PageProps extends ConnectFixProps {
  currentUser?: CurrentUser;
}
enum UserPageStatus {
  Read = 'read',
  Edit = 'edit',
}
enum UserGender {
  Female = 1,
  Male,
}

const { TabPane } = Tabs;

const Index: React.FC<PageProps> = (props) => {
  const {
    location: { query },
    currentUser,
    dispatch,
  } = props;

  const [activeKey, setActiveKey] = useState<string>();
  const [userStatus, setUserStatus] = useState<UserPageStatus>(UserPageStatus.Read);

  useEffect(() => {
    setActiveKey(query.tab);
  }, [query]);

  // 显示性别
  const genderName = (val?: UserGender) => {
    switch (val) {
      case UserGender.Female:
        return '女';
      case UserGender.Male:
        return '男';
      default:
        return '未填写';
    }
  };
  // 切换Tab
  const handleChangeTab: (key: string) => void = (key) => {
    const tab = key === 'index' ? '' : `?tab=${key}`;
    history.replace(`/account/${tab}`);
  };

  // 修改用户信息
  const handleEditUser = () => {
    setUserStatus(UserPageStatus.Edit);
  };

  const hanelCancel = () => {
    setUserStatus(UserPageStatus.Read);
  };

  // 提交数据
  const handleSubmit = (values: any) => {
    dispatch({
      type: 'user/updateCurrent',
      payload: values,
      callback: () => {
        dispatch({
          type: 'user/fetchCurrent',
        });
        hanelCancel();
      },
    });
  };

  // handleFetchRegion
  const handleFetchRegion = () => {

  };

  //
  const AccountData = () => {
    if (currentUser) {
      return (
        <div className={css.userWrap}>
          <p>姓名：{currentUser.name}</p>
          <p>昵称：{currentUser.nickname}</p>
          <p>邮箱：{currentUser.email}</p>
          <p>电话：{currentUser.phone}</p>
          <p>
            头像：
            <Avatar src={currentUser.avatar} />
          </p>
          <p>性别：{genderName(currentUser.gender)}</p>
          <p>Github：{currentUser.github_name}</p>
          <p>{currentUser.github_url}</p>
          <p>{currentUser.github_avatar}</p>
          <div className={css.editBtn}>
            <Button type="link" onClick={handleEditUser}>
              修改
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };

  // 编辑个人信息
  const AccountEdit = () => {
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    let initValues: any = {};
    if (currentUser) {
      initValues = {
        name: currentUser.name,
        nickname: currentUser.nickname,
        email: currentUser.email,
        phone: currentUser.phone,
        gender: currentUser.gender,
        avatar: currentUser.avatar,
      };
    }
    return (
      <Form {...formLayout} onFinish={handleSubmit} initialValues={initValues}>
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, whitespace: true, message: '请填写姓名' }]}
        >
          <Input placeholder="姓名" />
        </Form.Item>
        <Form.Item label="昵称" name="nickname" rules={[{ whitespace: false }]}>
          <Input placeholder="昵称" />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, type: 'email', message: '请填写邮箱' }]}
        >
          <Input placeholder="email" disabled readOnly />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Radio.Group>
            <Radio value={1}>女</Radio>
            <Radio value={2}>男</Radio>
            <Radio value={0}>其他</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[{ pattern: /^1\d{10}$/g, message: '手机号码格式错误' }]}
        >
          <Input placeholder="手机号" />
        </Form.Item>

        <Form.Item label="头像" name="avatar">
          {/* <Upload /> */}
          <Input placeholder="头像地址" />
        </Form.Item>
        <Form.Item label="&nbsp;" colon={false}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
          <Button onClick={hanelCancel} style={{ marginLeft: 20 }}>
            取消
          </Button>
        </Form.Item>
      </Form>
    );
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
          {userStatus === UserPageStatus.Read && <AccountData />}
          {userStatus === UserPageStatus.Edit && <AccountEdit />}
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
