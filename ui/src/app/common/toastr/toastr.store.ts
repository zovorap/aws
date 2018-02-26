import { set as _set_ } from 'lodash';

import actions from '~app/app.actions';
import { IToast, IAction } from '~schema';

export const TOAST_INITIAL_STATE: IToast = {
  type: null,
  title: null,
  message: null
};

export function toastReducer(state = TOAST_INITIAL_STATE, action: IAction): IToast {
  switch (action.type) {
    case actions.TOAST: return action.toast;
  }

  return state;
}


