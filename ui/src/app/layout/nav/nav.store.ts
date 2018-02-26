import { set as _set_ } from 'lodash';

import actions from '~app/app.actions';
import { INav } from '~schema';

export const NAV_INITIAL_STATE: INav = {
  isExpanded: false,
  items: []
};

export function navReducer(state: INav = NAV_INITIAL_STATE, action): INav {
  switch (action.type) {
    case actions.APPLY_NAVIGATION: return action.nav;
    case actions.TOGGLE:
      if (action.target === 'nav') {
        return {
          ...state,
          isExpanded: action.toggleState
        };
      } else if (action.target.indexOf('nav.items[') === 0) {
        const field = action.target.split('.')[1];
        _set_(state, `${field}.isExpanded`, action.toggleState);

        return state;
      }
  }

  return state;
}
