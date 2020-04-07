import { Subscription, Reducer } from 'umi';

export interface StateType {
  query?: any;
}

export interface SettingModelType {
  namespace: 'regions';
  state: StateType;
  reducers: {
    updateState: Reducer<StateType>;
  };
  subscriptions: { setup: Subscription };
}

const SettingModel: SettingModelType = {
  namespace: 'regions',
  state: {
    query: {},
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ history, dispatch }): void {
      history.listen(({ pathname, query }): void => {
        if (pathname === '/base/regions') {
          dispatch({
            type: 'updateState',
            payload: {
              query,
            },
          });
        }
      });
    },
  },
};
export default SettingModel;
