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
  CHANGE_POST_MESSAGE,
  HIDE_POST_MESSAGE_SUCCESS,
  SUBMIT_POST_MESSAGE,
  SUBMIT_POST_MESSAGE_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  postMessage: '',
  showPostSuccessMessage: false,
  postMessageReadOnly: false,
  profileImage: '',
};

/* eslint-disable default-case, no-param-reassign */
const viewFriendsPostsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_POST_MESSAGE:
        draft.postMessage = action.message;
        break;

      case SUBMIT_POST_MESSAGE:
        draft.postMessageReadOnly = true;
        break;

      case SUBMIT_POST_MESSAGE_SUCCESS:
        draft.postMessage = '';
        draft.showPostSuccessMessage = true;
        draft.postMessageReadOnly = false;
        break;

      case HIDE_POST_MESSAGE_SUCCESS:
        draft.showPostSuccessMessage = false;
        break;
    }
  });

export default viewFriendsPostsReducer;
