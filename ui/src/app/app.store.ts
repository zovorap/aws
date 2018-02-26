import { combineReducers } from 'redux';

import { IApi } from '~schema';
import { API_INITIAL_STATE, apiReducer } from './api/api.store';
import { NAV_INITIAL_STATE, navReducer } from './layout/nav/nav.store';
import { toastReducer } from '~common/toastr/toastr.store';
import { modalReducer } from '~common/modal/modal.store';
import { CLIENT_INITIAL_STATE, clientReducer } from './client/client.store';
import { FORMS_INITIAL_STATE, formsReducer } from '~common/form/form.store';
import actions from './app.actions';
import {
  IAction,
  IAgentInfo,
  IAppState,
  IBranding,
  IHeader,
  IFooter,
  INav,
  IToast
} from '~schema';

type Reducer = (state: any, action: IAction) => IAppState;

export const INITIAL_STATE: IAppState = {
  agentInfo: null,
  api: API_INITIAL_STATE,
  branding: null,
  client: CLIENT_INITIAL_STATE,
  favicon: null,
  footer: null,
  forms: FORMS_INITIAL_STATE,
  header: null,
  modal: null,
  nav: NAV_INITIAL_STATE,
  title: null,
  toast: null
};

const reducers = {
  agentInfo: createReducer(actions.APPLY_AGENT_INFO, 'agentInfo'),
  api: apiReducer,
  branding: createReducer<IBranding>(actions.APPLY_BRANDING, 'branding'),
  client: clientReducer,
  favicon: createReducer(actions.APPLY_WEBSITE_FAVICON, 'favicon'),
  footer: createReducer(actions.APPLY_FOOTER, 'footer'),
  forms: formsReducer,
  header: createReducer(actions.APPLY_HEADER, 'header'),
  modal: modalReducer,
  nav: navReducer,
  title: createReducer(actions.APPLY_WEBSITE_TITLE, 'title'),
  toast: toastReducer
};

export const rootReducer = combineReducers<IAppState>(reducers);

function createReducer<T>(actionName: string, field: string): Reducer {
  return (state = INITIAL_STATE[field], action: IAction): T => {
    switch (action.type) {
      case actionName: return action[field];
    }

    return state;
  };
}
