import request from '@/utils/request';

export interface LoginParamsType {
  login: string;
  password: string;
  mobile: string;
  captchaCode: string;
}

export interface AuthLoginParamsType {
  origin: string;
  code: string;
}

export interface CaptchaParamsType {
  type: string;
  width: number;
  height: number;
}

export async function accountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function accountLogout() {
  return request('/api/logout', {
    method: 'POST',
  });
}

/**
 * github 第三方登录
 * @param data
 * @param {string} data.origin - 登录源，github。。。
 * @param {string} data.code - github返回的code
 */
export async function oAuthLogin(data: AuthLoginParamsType): Promise<any> {
  return request('/api/oauth', {
    method: 'POST',
    data,
  });
}

/**
 * 获取图片验证码
 * @param data
 * @param {string} data.type - 类型
 * @param {string} data.width - 长度
 * @param {string} data.height - 高度
 */
export async function getCaptcha(params?: CaptchaParamsType): Promise<any> {
  return request('/api/captcha', {
    method: 'GET',
    params,
  });
}
