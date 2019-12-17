import {
  LOAD_PROFILE_USER,
  LOAD_PROFILE_USER_ERROR,
  LOAD_PROFILE_USER_SUCCESS,
} from './constants';

/**
 * load profile user
 */

export function loadProfileUser(username) {
  return {
    type: LOAD_PROFILE_USER,
    username,
  };
}

export function loadProfileUserSuccess(user) {
  return {
    type: LOAD_PROFILE_USER_SUCCESS,
    user,
  };
}

export function loadProfileUserError() {
  return {
    type: LOAD_PROFILE_USER_ERROR,
  };
}
