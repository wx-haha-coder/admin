import request from '@/utils/request';

/**
 * 获取region数据（爬虫）
 */
export async function fetchRegions(): Promise<any> {
  return request('/api/admin/region/spider', {
    method: 'GET',
  });
}

/**
 * 获取地域信息
 * @param params
 * @param {string} code - 地区code
 */
export async function getRegions(params?: any): Promise<any> {
  return request('/api/admin/region', {
    method: 'GET',
    params,
  });
}

/**
 * 获取国家
 * @param params
 */
export async function getCountrys(params?: any): Promise<any> {
  return request('/api/admin/region/country', {
    method: 'GET',
    params,
  });
}
