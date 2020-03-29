import request from '@/utils/request';

export interface LoginParamsType {
  login: string;
  password: string;
  mobile: string;
  captcha: string;
}

export interface AuthLoginParamsType {
  origin: string;
  code: string;
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

export async function getCaptcha(mobile: string) {
  return request(`/api/captcha?mobile=${mobile}`);
}

/**
 * github 第三方登录
 * @param data
 * @param {string} data.origin - 登录源，github。。。
 * @param {string} data.code -
 */
export async function githubAuthLogin(data: AuthLoginParamsType) {
  return request('/api/login/auth', {
    method: 'POST',
    data,
  });
}
