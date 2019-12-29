import {
  CHANGE_PROFILE_PICTURE,
  LOAD_PROFILE_USER,
  LOAD_PROFILE_USER_ERROR,
  LOAD_PROFILE_USER_SUCCESS,
  UPLOAD_PROFILE_PICTURE,
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

export function changeProfilePicture(filename, image) {
  return {
    type: CHANGE_PROFILE_PICTURE,
    filename,
    image,
  };
}

export function uploadProfilePicture(image) {
  return {
    type: UPLOAD_PROFILE_PICTURE,
    image,
  };
}
