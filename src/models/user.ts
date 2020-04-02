import { Effect, Reducer } from 'umi';

import { queryCurrent, query as queryUsers, updateCurrent } from '@/services/user';

export interface CurrentUser {
  avatar?: string;
  login?: string;
  email?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  id?: string;
  unreadCount?: number;
  qq?: string;
  wechat?: string;
  gender?: number;
  github_name?: string;
  github_url?: string;
  github_avatar?: string;
  phone?: string;
  nickname?: string;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    updateCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const resp = yield call(queryCurrent);
      if (resp.code !== 0) {
        return;
      }
      yield put({
        type: 'saveCurrentUser',
        payload: resp.data,
      });
    },
    *updateCurrent({ payload, callback }, { call }) {
      const resp = yield call(updateCurrent, payload);
      if (resp.code !== 0) {
        return;
      }
      if (callback) {
        callback();
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state = { currentUser: {} }, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
