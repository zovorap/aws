import actions from './api.actions';
import { IApi } from '~schema';

export const API_INITIAL_STATE: IApi = {
  numberOfActiveRequests: 0
};

export function apiReducer(state: IApi = API_INITIAL_STATE, action): IApi {
  switch (action.type) {
    case actions.ADD_REQUEST: return addRequest(state, action);
    case actions.SUBSTRACT_REQUEST: return substractRequest(state, action);
  }

  return state;
}

function addRequest(state: IApi, action): IApi {
  return {
    ...state,
    numberOfActiveRequests: state.numberOfActiveRequests + 1
  };
}

function substractRequest(state: IApi, action): IApi {
  return {
    ...state,
    numberOfActiveRequests: Math.max(state.numberOfActiveRequests - 1, 0)
  };
}
