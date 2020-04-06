import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';

import { accountLogin, accountLogout, oAuthLogin, register } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  authority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
    oAuthLogin: Effect;
    register: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload, callback }, { call, put }) {
      const resp = yield call(accountLogin, payload);
      if (resp.code === 0) {
        const { data } = resp;
        // 被禁用
        if (data.status !== '正常') {
          message.error(resp.msg);
          return;
        }
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
      if (callback) {
        callback(resp.code === 0);
      }
    },

    *logout(_, { call, put }) {
      const { redirect } = getPageQuery();
      yield call(accountLogout);
      yield put({
        type: 'user/saveCurrentUser',
        payload: {},
      });
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },

    *oAuthLogin({ payload, callback }, { call, dispatch }) {
      const resp = yield call(oAuthLogin, payload);
      if (resp.code !== 0) {
        return;
      }
      if (callback) {
        callback(resp.data);
      }
      yield dispatch({
        type: 'user/saveCurrentUser',
        payload: resp.data,
      });
    },

    *register({ payload, callback }, { call }) {
      const resp = yield call(register, payload);
      if (resp.code !== 0) {
        return;
      }
      if (callback) {
        callback(resp.code !== 0);
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.authority || ['admin']);
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        status: payload.status,
        token: payload.token,
      };
    },
  },
};

export default Model;
