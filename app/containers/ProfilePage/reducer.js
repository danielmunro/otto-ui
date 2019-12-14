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
  LOAD_PROFILE_USER,
  LOAD_PROFILE_USER_ERROR,
  LOAD_PROFILE_USER_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  user: { username: '', uuid: '', name: '' },
  userLoaded: false,
};

/* eslint-disable default-case, no-param-reassign */
const whoToFollowReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PROFILE_USER:
        draft.userLoaded = false;
        break;

      case LOAD_PROFILE_USER_SUCCESS:
        draft.user = action.user;
        draft.userLoaded = true;
        break;

      case LOAD_PROFILE_USER_ERROR:
        draft.userLoaded = true;
        break;
    }
  });

export default whoToFollowReducer;
