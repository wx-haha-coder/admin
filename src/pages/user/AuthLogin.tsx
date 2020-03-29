import React, { useEffect } from 'react';
import { notification } from 'antd';
import { history } from 'umi';
import { ConnectFixProps } from '@/types/router';
import css from './AuthLogin.less';

interface PageProps extends ConnectFixProps {}

const AuthLogin: React.FC<PageProps> = (props) => {
  const {
    location: { query },
    dispatch
  } = props;

  if (!query.code) {
    notification.error({
      message: '登录失败',
      description: '无法获取到参数',
    });
    history.replace('/user/login');
    return null;
  }

  useEffect(() => {
    if (query.code && dispatch) {
      // TODO: 请求api
      // dispatch();
    }
  }, []);

  return <div className={css.wrap}>第三番登录</div>;
};

export default AuthLogin;
