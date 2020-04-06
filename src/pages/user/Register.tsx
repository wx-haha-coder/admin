import React from 'react';
import { connect, Link, history } from 'umi';
import { Form, Input, Button, Row, Col } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ConnectFixProps } from '@/types/router';
import Captcha from './components/Captcha';
import css from './Login.less';

interface PageProps extends ConnectFixProps {}

const RegisterPage: React.FC<PageProps> = (props) => {
  const [form] = Form.useForm();
  const { dispatch } = props;

  const onFinish = (values: any) => {
    const cloneValues = { ...values };
    delete cloneValues.password_repeat;
    if (dispatch) {
      dispatch({
        type: 'login/register',
        payload: cloneValues,
        callback: () => {
          history.replace('/');
        },
      });
    }
  };

  return (
    <div className={css.wrap}>
      <h3 style={{ marginBottom: 20 }}>注册</h3>
      <Form onFinish={onFinish} form={form}>
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
            placeholder="密码(长度6-30)"
            prefix={<LockOutlined className={css.prefixIcon} />}
          />
        </Form.Item>
        <Form.Item
          name="password_repeat"
          hasFeedback
          dependencies={['password']}
          rules={[
            { required: true, message: '请填写密码' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="确认密码"
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
              <Captcha onChange={() => {}} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" style={{ width: '100%' }} htmlType="submit">
            注册
          </Button>
        </Form.Item>
        <div>
          <Link to="/user/login">已有账号，去登陆？</Link>
        </div>
      </Form>
    </div>
  );
};

export default connect()(RegisterPage);
