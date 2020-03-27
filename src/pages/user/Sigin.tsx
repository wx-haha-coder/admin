import React, { useState } from 'react';
import { connect } from 'umi';
import { Form, Input, Button, Tabs, Row, Col } from 'antd';
import { LockOutlined, UserOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';
import css from './Sigin.less';

const { TabPane } = Tabs;
enum TabKey {
  NormalLogin = 'passLogin',
  PhoneLogin = 'phoneLogin',
}

const LoginPage = (props) => {
  const [form] = Form.useForm();
  const [tabKey, setTabKey] = useState<string>(TabKey.NormalLogin);
  const { dispatch } = props;
  const tabProps = {
    animated: false,
    onChange: (key: string) => {
      form.resetFields();
      setTabKey(key);
    },
  };
  const onFinish = (values: any) => {
    dispatch({
      type: 'login/login',
      payload: { ...values, loginType: tabKey },
    });
  };

  return (
    <div className={css.wrap}>
      <Form onFinish={onFinish} form={form}>
        <Tabs {...tabProps}>
          <TabPane tab="账号登录" key={TabKey.NormalLogin}>
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
            <Form.Item name="captcha" rules={[{ required: true, message: '请填写图片验证码' }]}>
              <Row gutter={8}>
                <Col span={16}>
                  <Input
                    size="large"
                    placeholder="图片验证码"
                    prefix={<LockOutlined className={css.prefixIcon} />}
                  />
                </Col>
                <Col span={8} className={css.captchaImgBox}>
                  <img
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                    alt="code"
                    className={css.captchaImg}
                  />
                </Col>
              </Row>
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登录" key={TabKey.PhoneLogin}>
            <Form.Item name="phone" rules={[{ required: true, message: '请填写登录名称' }]}>
              <Input
                size="large"
                placeholder="手机号码"
                prefix={<MobileOutlined className={css.prefixIcon} />}
              />
            </Form.Item>
            <Form.Item name="msgcode" rules={[{ required: true, message: '请填写短信验证码' }]}>
              <Row gutter={8}>
                <Col span={16}>
                  <Input
                    size="large"
                    placeholder="短信验证码"
                    prefix={<MailOutlined className={css.prefixIcon} />}
                  />
                </Col>
                <Col span={8} className={css.captchaImgBox}>
                  <Button size="large" type="primary">
                    获取验证码
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </TabPane>
        </Tabs>
        <Form.Item>
          <Button size="large" type="primary" style={{ width: '100%' }} htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect()(LoginPage);
