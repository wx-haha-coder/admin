import request from '@/utils/request';

export interface LoginParamsType {
  login: string;
  password: string;
  mobile: string;
  captchaCode: string;
}

export interface RegisterParamsType {
  login: string;
  password: string;
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

/**
 * 登录
 * @param params params
 */
export async function accountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

/**
 * 退出登录
 */
export async function accountLogout() {
  return request('/api/logout', {
    method: 'DELETE',
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

/**
 * 注册
 * @param data
 * @param {string} data.login - 登录名
 * @param {string} data.password - 密码
 * @param {string} data.captcha - 图片验证码
 */
export async function register(data: RegisterParamsType): Promise<any> {
  return request('/api/register', {
    method: 'POST',
    data,
  });
}
