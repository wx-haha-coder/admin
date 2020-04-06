import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { getCaptcha } from '@/services/login';
import css from '../Login.less';

interface CaptchaPropType {
  width?: number;
  height?: number;
  onChange?: (url: string) => void;
  fresh?: boolean;
}
const Captcha: React.FC<CaptchaPropType> = () => {
  const [img, setImg] = useState('');

  const handleFreshCaptcha = () => {
    getCaptcha().then((resp) => {
      if (resp.code === 0) {
        setImg(resp.data.img);
      }
    });
  };

  useEffect(() => {
    handleFreshCaptcha();
  }, []);

  if (img) {
    return <img src={img} alt="code" className={css.captchaImg} onClick={handleFreshCaptcha} />;
  }
  return <Spin />;
};

export default Captcha;
