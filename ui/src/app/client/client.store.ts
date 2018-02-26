import { set as _set_, get as _get_ } from 'lodash';

import actions from '~app/app.actions';
import { IClient, IClientMenu } from '~schema';

export const CLIENT_INITIAL_STATE: IClient = { };

export function clientReducer(state: IClient = CLIENT_INITIAL_STATE, action): IClient {
  switch (action.type) {
    case actions.APPLY_CLIENT_DATA:
      _set_(action.data, 'menu.isExpanded', false);

      return {
        ...state,
        firstName: _get_(action, 'data.firstName'),
        lastName: _get_(action, 'data.lastName'),
        id: _get_(action, 'data.id'),
        token: _get_(action, 'data.token'),
        menu: _get_(action, 'data.menu'),
        settings: _get_(action, 'data.settings')
      };
    case actions.TOGGLE:
      if (action.target === 'client.menu') {
        _set_(state, 'menu.isExpanded', action.toggleState);
      }
      break;
  }

  return state;
}


