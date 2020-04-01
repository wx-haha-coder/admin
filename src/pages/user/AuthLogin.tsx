import React, { useEffect, useState } from 'react';
import { notification, Button } from 'antd';
import { history, connect } from 'umi';
import { ConnectFixProps } from '@/types/router';
import css from './AuthLogin.less';

interface PageProps extends ConnectFixProps {}

const AuthLogin: React.FC<PageProps> = (props) => {
  const {
    location: { query },
    dispatch,
  } = props;
  const [userData, setUserData] = useState();
  // useEffect(() => {
  //   if (!hasCode) {
  //     notification.error({
  //       message: '登录失败',
  //       description: '无法获取到参数',
  //     });
  //     history.replace('/user/login');
  //   }
  // }, []);
  // if (!hasCode) {
  //   return null;
  // }
  const handleLogin = () => {
    if (dispatch) {
      dispatch({
        type: 'login/oAuthLogin',
        payload: {
          origin: 'github',
          code: query.code,
        },
        callback: (data) => {
          setUserData(data)
        },
      });
    }
  };

  return (
    <div className={css.wrap}>
      <p>{query.code}</p>
      <div>{JSON.stringify(userData || {})}</div>
      <Button onClick={handleLogin}>登录</Button>
    </div>
  );
};

export default connect()(AuthLogin);
