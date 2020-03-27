import request from '@/utils/request';

export interface LoginParamsType {
  login: string;
  password: string;
  mobile: string;
  captcha: string;
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
  return request(`/api/login/captcha?mobile=${mobile}`);
}
