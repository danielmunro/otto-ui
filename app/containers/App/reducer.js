/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_ERROR,
  SUBMIT_LOGIN_SUCCESS,
  LOGOUT,
  LOAD_FOLLOWING_POSTS,
  LOAD_FOLLOWING_POSTS_ERROR,
  LOAD_FOLLOWING_POSTS_SUCCESS,
  LOAD_SESSION_USER_SUCCESS,
  LOAD_SESSION_USER_ERROR,
} from './constants';
import auth from '../../utils/auth';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  user: {
    uuid: '',
    username: '',
    name: '',
    birthday: '',
    bioMessage: '',
  },
  userLoaded: false,
  sessionToken: auth().getToken(),
  loginError: false,
  authResponse: '',
  pwResetError: false,
  posts: [],
  postsLoaded: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SUBMIT_LOGIN:
        draft.loading = true;
        draft.loginError = false;
        break;

      case SUBMIT_LOGIN_ERROR:
        draft.loading = false;
        draft.loginError = true;
        break;

      case SUBMIT_LOGIN_SUCCESS: {
        draft.loading = false;
        draft.loginError = false;
        draft.sessionToken = action.sessionToken;
        draft.authResponse = action.authResponse;
        draft.user = { ...draft.user, ...action.user };
        draft.userLoaded = true;
        auth().update(action);
        break;
      }

      case LOGOUT:
        draft.authResponse = null;
        draft.sessionToken = null;
        auth().invalidate();
        break;

      case LOAD_FOLLOWING_POSTS:
        draft.loading = true;
        draft.postsLoaded = false;
        break;

      case LOAD_FOLLOWING_POSTS_ERROR:
        draft.loading = false;
        break;

      case LOAD_FOLLOWING_POSTS_SUCCESS:
        draft.loading = false;
        draft.posts = action.posts;
        draft.postsLoaded = true;
        break;

      case LOAD_SESSION_USER_SUCCESS:
        draft.user = { ...draft.user, ...action.user };
        break;

      case LOAD_SESSION_USER_ERROR:
        auth().invalidate();
        break;
    }
  });

export default appReducer;
