/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_POST_MESSAGE } from './constants';

// The initial state of the App
export const initialState = {
  postMessage: '',
};

/* eslint-disable default-case, no-param-reassign */
const viewFriendsPostsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_POST_MESSAGE:
        draft.postMessage = action.message;
        break;
    }
  });

export default viewFriendsPostsReducer;
