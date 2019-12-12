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
  LOAD_WHO_TO_FOLLOW,
  LOAD_WHO_TO_FOLLOW_ERROR,
  LOAD_WHO_TO_FOLLOW_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  usersToFollow: [],
  whoToFollowLoaded: false,
};

/* eslint-disable default-case, no-param-reassign */
const whoToFollowReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_WHO_TO_FOLLOW:
        draft.usersToFollow = [];
        draft.whoToFollowLoaded = true;
        break;

      case LOAD_WHO_TO_FOLLOW_SUCCESS:
        draft.usersToFollow = action.users;
        draft.whoToFollowLoaded = true;
        break;

      case LOAD_WHO_TO_FOLLOW_ERROR:
        draft.whoToFollowLoaded = true;
        break;
    }
  });

export default whoToFollowReducer;
