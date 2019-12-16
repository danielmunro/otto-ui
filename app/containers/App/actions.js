/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCESS,
  SUBMIT_LOGIN_ERROR,
  SUBMIT_PW_RESET,
  SUBMIT_PW_RESET_SUCCESS,
  SUBMIT_PW_RESET_ERROR,
  LOGOUT,
  SUBMIT_SIGNUP,
  SUBMIT_SIGNUP_SUCCESS,
  SUBMIT_SIGNUP_ERROR,
  LOAD_SESSION_USER,
  LOAD_SESSION_USER_SUCCESS,
  LOAD_SESSION_USER_ERROR,
  LOAD_FOLLOWING_POSTS,
  LOAD_FOLLOWING_POSTS_SUCCESS,
  LOAD_FOLLOWING_POSTS_ERROR,
} from './constants';

/**
 * Login, success, error
 */

export function submitLogin() {
  return {
    type: SUBMIT_LOGIN,
  };
}

export function loginLoaded({ AuthResponse, Token, User }) {
  return {
    type: SUBMIT_LOGIN_SUCCESS,
    sessionToken: Token,
    authResponse: `${AuthResponse}`,
    user: User,
  };
}

export function loginLoadedError() {
  return {
    type: SUBMIT_LOGIN_ERROR,
  };
}

/**
 * Signup, success, error
 */

export function submitSignup() {
  return {
    type: SUBMIT_SIGNUP,
  };
}

export function signupLoaded({ authResponse, token }) {
  return {
    type: SUBMIT_SIGNUP_SUCCESS,
    sessionToken: token,
    authResponse,
    // authResponse: AUTH_CHALLENGE_NEW_PASSWORD,
  };
}

export function signupLoadedError() {
  return {
    type: SUBMIT_SIGNUP_ERROR,
  };
}

/**
 * Logout
 */

export function logout() {
  return {
    type: LOGOUT,
  };
}

/**
 * PW reset, success, error
 */

export function submitPwReset() {
  return {
    type: SUBMIT_PW_RESET,
  };
}

export function pwResetLoaded({ authResponse, token }) {
  return {
    type: SUBMIT_PW_RESET_SUCCESS,
    sessionToken: token,
    authResponse,
  };
}

export function pwResetError() {
  return {
    type: SUBMIT_PW_RESET_ERROR,
  };
}

/**
 * load session user, success, error
 */

export function loadSessionUser() {
  return {
    type: LOAD_SESSION_USER,
  };
}

export function loadSessionUserSuccess({ user }) {
  return {
    type: LOAD_SESSION_USER_SUCCESS,
    user,
  };
}

export function loadSessionUserError() {
  return {
    type: LOAD_SESSION_USER_ERROR,
  };
}

/**
 * load following user posts
 */

export function loadFollowingUserPosts() {
  return {
    type: LOAD_FOLLOWING_POSTS,
  };
}

export function loadFollowingUserPostsSuccess(posts) {
  return {
    type: LOAD_FOLLOWING_POSTS_SUCCESS,
    posts,
  };
}

export function loadFollowingUserPostsError() {
  return {
    type: LOAD_FOLLOWING_POSTS_ERROR,
  };
}
