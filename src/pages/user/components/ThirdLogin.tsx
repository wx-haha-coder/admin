import React from 'react';
import { Link } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { getGithubUrl } from '@/utils/github';
import css from '../Login.less';

const ThirdLogin: React.FC<{}> = () => {
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

  return (
    <div className={css.other}>
      <span>
        其他登录方式
        <GithubOutlined onClick={handleGithubLogin} />
      </span>
      <Link to="/user/signup">去注册</Link>
    </div>
  );
};

export default ThirdLogin;
