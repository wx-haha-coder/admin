import request from '@/utils/request';

export interface UpdateUserParamType {
  name: string;
  nickname?: string;
  gender?: number;
  phone?: string;
  avatar?: string;
}

export async function query(): Promise<any> {
  return request('/api/users');
}

/**
 * 查询当前登录用户信息
 */
export async function queryCurrent(): Promise<any> {
  return request('/api/user');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

/**
 * 更新用户信息
 * @param data
 * @param {string} param.name - 姓名
 * @param {string} param.nickname - 昵称
 * @param {gender} param.gender - 性别 可选值：0：未知 ，1：女，2：男
 * @param {string} param.phone - 电话号码
 * @param {string} param.avatar - 头像
 */
export async function updateCurrent(data: UpdateUserParamType): Promise<any> {
  return request('/api/user', {
    method: 'PUT',
    data,
  });
}
