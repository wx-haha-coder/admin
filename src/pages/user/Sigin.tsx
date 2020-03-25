import React from 'react';
import { connect } from 'umi';
import { Form, Input, Button, Tabs } from 'antd';
import { LockOutlined, UserOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';
import css from './Login.less';

const { TabPane } = Tabs;

const LoginPage = (props) => {
  const { dispatch } = props;
  const tabProps = {
    animated: false,
  };
  const onFinish = (values) => {
    console.log(values);
    console.log(dispatch);
  };

  return (
    <div className={css.wrap}>
      <Form onFinish={onFinish}>
        <Tabs {...tabProps}>
          <TabPane tab="账号登录" key="login-pass">
            <Form.Item name="login" rules={[{ required: true, message: '请填写登录名称' }]}>
              <Input
                size="large"
                placeholder="用户名"
                prefix={<UserOutlined className={css.prefixIcon} />}
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请填写密码' }]}>
              <Input.Password
                size="large"
                placeholder="密码"
                prefix={<LockOutlined className={css.prefixIcon} />}
              />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" style={{ width: '100%' }}>
                登录
              </Button>
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登录" key="login-phone">
            <Form.Item name="phone" rules={[{ required: true, message: '请填写登录名称' }]}>
              <Input
                size="large"
                placeholder="手机号码"
                prefix={<MobileOutlined className={css.prefixIcon} />}
              />
            </Form.Item>
            <Form.Item name="msgcode" rules={[{ required: true, message: '请填写短信验证码' }]}>
              <Input.Password
                size="large"
                placeholder="短信验证码"
                prefix={<MailOutlined className={css.prefixIcon} />}
              />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" style={{ width: '100%' }} htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
};

export default connect()(LoginPage);
