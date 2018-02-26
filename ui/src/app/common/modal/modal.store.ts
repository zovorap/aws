import { set as _set_ } from 'lodash';

import actions from './modal.actions';
import { IModal, IAction } from '~schema';

export const MODAL_INITIAL_STATE: IModal = {
  id: null,
  isActive: false,
  isVisible: false,
  hasControls: true,
  tpl: null,
  url: null
};

export function modalReducer(state = MODAL_INITIAL_STATE, action: IAction): IModal {
  switch (action.type) {
    case actions.OPEN_MODAL:
      const newState = {
        ...state,
        id: action.id,
        isActive: true,
        tpl: action.tpl,
        url: action.url,
        title: action.title,
        cssClass: action.cssClass,
        confirmButton: action.confirmButton,
        cancelButton: action.cancelButton,
        hasControls: action.hasControls
      };

      return newState;
    case actions.CLOSE_MODAL:
      return null;
    case actions.ANIMATE_MODAL:
      return { ...state, isVisible: action.isVisible };
  }

  return state;
}
