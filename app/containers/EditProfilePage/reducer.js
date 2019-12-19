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
  EDIT_PROFILE_USER_SUBMIT,
  EDIT_PROFILE_USER_SUCCESS,
  EDIT_PROFILE_USER_ERROR,
  EDIT_PROFILE_LOAD,
  CHANGE_NAME,
  CHANGE_BIRTHDAY,
  CHANGE_BIO_MESSAGE,
} from './constants';

// The initial state of the App
export const initialState = {
  user: { username: '', uuid: '', name: '', birthday: '', bioMessage: '' },
  updated: false,
  isUserLoaded: false,
};

/* eslint-disable default-case, no-param-reassign */
const editProfileReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case EDIT_PROFILE_LOAD:
        draft.user = action.user;
        draft.isUserLoaded = true;
        break;

      case EDIT_PROFILE_USER_SUBMIT:
        draft.updated = false;
        break;

      case EDIT_PROFILE_USER_SUCCESS:
        draft.updated = true;
        break;

      case EDIT_PROFILE_USER_ERROR:
        draft.updated = false;
        break;

      case CHANGE_NAME:
        draft.user.name = action.value;
        break;

      case CHANGE_BIRTHDAY:
        draft.user.birthday = action.value;
        break;

      case CHANGE_BIO_MESSAGE:
        draft.user.bioMessage = action.value;
        break;
    }
  });

export default editProfileReducer;
