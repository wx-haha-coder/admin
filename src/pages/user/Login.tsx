import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Button, Tabs, Row, Col, Spin } from 'antd';
import {
  LockOutlined,
  UserOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { ConnectFixProps } from '@/types/router';
import { getGithubUrl } from '@/utils/github';
import { getCaptcha } from '@/services/login';

import css from './Login.less';

interface PageProps extends ConnectFixProps {}

const { TabPane } = Tabs;

enum TabKey {
  NormalLogin = 'passLogin',
  PhoneLogin = 'phoneLogin',
}

const LoginPage: React.FC<PageProps> = (props) => {
  const [form] = Form.useForm();
  const [tabKey, setTabKey] = useState<string>(TabKey.NormalLogin);
  const [captchaImg, setCaptchImg] = useState<string>();

  const { dispatch } = props;
  const tabProps = {
    animated: false,
    onChange: (key: string) => {
      form.resetFields();
      setTabKey(key);
    },
  };
  // 刷新验证码
  const handleFreshCaptcha = () => {
    getCaptcha().then((resp) => {
      if (resp.code === 0) {
        setCaptchImg(resp.data.img);
      }
    });
  };

  const onFinish = (values: any) => {
    if (dispatch) {
      dispatch({
        type: 'login/login',
        payload: { ...values, loginType: tabKey },
        callback: (success: boolean) => {
          if (!success) {
            handleFreshCaptcha();
          }
        },
      });
    }
  };

  // github 登录
  const handleGithubLogin = () => {
    const redirectUrl = `${window.location.origin}/auth/login`;
    const clientId = 'c858854fd312550afb81';
    const url = getGithubUrl({
      redirect_uri: encodeURIComponent(redirectUrl),
      client_id: clientId,
    });
    const strWindowFeatures = `
        menubar=no,
        location=no,
        resizable=yes,
        scrollbars=yes,
        status=yes,
        width=500,
    `;
    window.open(url, '登录', strWindowFeatures);
  };

  useEffect(() => {
    handleFreshCaptcha();
  }, []);

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
            <Form.Item name="captchaCode" rules={[{ required: true, message: '请填写图片验证码' }]}>
              <Row gutter={8}>
                <Col span={16}>
                  <Input
                    size="large"
                    placeholder="图片验证码"
                    prefix={<LockOutlined className={css.prefixIcon} />}
                  />
                </Col>
                <Col span={8} className={css.captchaImgBox}>
                  {captchaImg ? (
                    <img
                      src={captchaImg}
                      alt="code"
                      className={css.captchaImg}
                      onClick={handleFreshCaptcha}
                    />
                  ) : (
                    <Spin />
                  )}
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
      <div className={css.other}>
        其他登录方式
        <GithubOutlined onClick={handleGithubLogin} />
      </div>
    </div>
  );
};

export default connect()(LoginPage);
