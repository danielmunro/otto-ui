/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'app/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'app/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'app/App/LOAD_REPOS_ERROR';

export const SUBMIT_LOGIN = 'app/App/SUBMIT_LOGIN';
export const SUBMIT_LOGIN_SUCCESS = 'app/App/SUBMIT_LOGIN_SUCCESS';
export const SUBMIT_LOGIN_ERROR = 'app/App/SUBMIT_LOGIN_ERROR';

export const SUBMIT_PW_RESET = 'app/App/SUBMIT_LOGIN';
export const SUBMIT_PW_RESET_SUCCESS = 'app/App/SUBMIT_LOGIN_SUCCESS';
export const SUBMIT_PW_RESET_ERROR = 'app/App/SUBMIT_LOGIN_ERROR';

export const SUBMIT_SIGNUP = 'app/App/SUBMIT_SIGNUP';
export const SUBMIT_SIGNUP_SUCCESS = 'app/App/SUBMIT_SIGNUP_SUCCESS';
export const SUBMIT_SIGNUP_ERROR = 'app/App/SUBMIT_SIGNUP_ERROR';

export const LOAD_SESSION_USER = 'app/App/LOAD_SESSION_USER';
export const LOAD_SESSION_USER_SUCCESS = 'app/App/LOAD_SESSION_USER_SUCCESS';
export const LOAD_SESSION_USER_ERROR = 'app/App/LOAD_SESSION_USER_ERROR';

export const LOAD_FOLLOWING_POSTS = 'app/App/LOAD_FOLLOWING_POSTS';
export const LOAD_FOLLOWING_POSTS_SUCCESS =
  'app/App/LOAD_FOLLOWING_POSTS_SUCCESS';
export const LOAD_FOLLOWING_POSTS_ERROR = 'app/App/LOAD_FOLLOWING_POSTS_ERROR';

export const LOGOUT = 'app/App/LOGOUT';

/**
 * Constant returned from the server during authn. Indicates that the
 * server requires a password reset from the user.
 *
 * @type {string}
 */
export const AUTH_CHALLENGE_NEW_PASSWORD = 'ChallengeNewPassword';

/**
 * api endpoint

 * @type {string}
 */

export const API_ENDPOINT = 'http://localhost:8000';

export const APP_NAME = 'TimeBox';
