import { get as _get_, set as _set_, unset as _unset_ } from 'lodash';

import actions from './form.actions';
import { IForms, IAction } from '~schema';

export const FORMS_INITIAL_STATE: IForms = {};

export function formsReducer(state = FORMS_INITIAL_STATE, action: IAction): IForms {
  switch (action.type) {
    case actions.ADD_FORM: return addForm(state, action);
    case actions.REMOVE_FORM: return removeForm(state, action);
    case actions.SUBMIT_FORM: return submitForm(state, action);
    case actions.CHANGE_FORM: return changeForm(state, action);
  }

  return state;
}

function addForm(forms: IForms, action: IAction): IForms {
  if (!_get_(forms, action.formId)) {
    _set_(forms, action.formId, {
      id: action.formId,
      form: action.form,
      submitAttempts: 0
    });
  } else {
    throw new Error(`Form '${action.formId}' already exists!!!`);
  }

  return forms;
}

function removeForm(forms: IForms, action: IAction): IForms {
  _unset_(forms, action.formId);
  return forms || {};
}

function submitForm(forms: IForms, action: IAction): IForms {
  let form = _get_(forms, action.formId);

  if (!!form) {
    form.submitAttempts++;
  }

  return forms;
}

function changeForm(forms: IForms, action: IAction): IForms {
  let form = _get_(forms, action.formId);

  if (!!form) {
    form.form = action.form;
  }

  return forms;
}


