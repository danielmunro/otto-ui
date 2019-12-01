/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_EMAIL, CHANGE_NEW_PASSWORD } from './constants';

// The initial state of the App
export const initialState = {
  email: '',
  newPassword: '',
};

/* eslint-disable default-case, no-param-reassign */
const pwResetReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.email = action.email;
        break;
      case CHANGE_NEW_PASSWORD:
        draft.newPassword = action.password;
        break;
    }
  });

export default pwResetReducer;
