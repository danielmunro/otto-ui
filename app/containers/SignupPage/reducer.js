/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CHANGE_EMAIL,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CONFIRM,
} from './constants';

// The initial state of the App
export const initialState = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
};

/* eslint-disable default-case, no-param-reassign */
const signupReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.email = action.email;
        break;
      case CHANGE_USERNAME:
        draft.username = action.username;
        break;
      case CHANGE_PASSWORD:
        draft.password = action.password;
        break;
      case CHANGE_PASSWORD_CONFIRM:
        draft.passwordConfirm = action.passwordConfirm;
        break;
    }
  });

export default signupReducer;
