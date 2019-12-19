import {
  EDIT_PROFILE_USER_SUBMIT,
  EDIT_PROFILE_USER_SUCCESS,
  EDIT_PROFILE_USER_ERROR,
  EDIT_PROFILE_LOAD,
  CHANGE_NAME,
  CHANGE_BIRTHDAY,
  CHANGE_BIO_MESSAGE,
} from './constants';

/**
 * load profile user
 */

export function editProfileLoad(user) {
  return {
    type: EDIT_PROFILE_LOAD,
    user,
  };
}

export function editProfileUserSubmit(user) {
  return {
    type: EDIT_PROFILE_USER_SUBMIT,
    user,
  };
}

export function editProfileUserSuccess(user) {
  return {
    type: EDIT_PROFILE_USER_SUCCESS,
    user,
  };
}

export function editProfileUserError() {
  return {
    type: EDIT_PROFILE_USER_ERROR,
  };
}

export function changeName(value) {
  return {
    type: CHANGE_NAME,
    value,
  };
}

export function changeBirthday(value) {
  return {
    type: CHANGE_BIRTHDAY,
    value,
  };
}

export function changeBioMessage(value) {
  return {
    type: CHANGE_BIO_MESSAGE,
    value,
  };
}
