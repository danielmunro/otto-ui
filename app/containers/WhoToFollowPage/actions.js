import {
  LOAD_WHO_TO_FOLLOW,
  LOAD_WHO_TO_FOLLOW_ERROR,
  LOAD_WHO_TO_FOLLOW_SUCCESS,
} from './constants';

/**
 * load who to follow
 */

export function loadWhoToFollow() {
  return {
    type: LOAD_WHO_TO_FOLLOW,
  };
}

export function loadWhoToFollowSuccess(users) {
  console.log('loadWhoToFollowSuccess', users);
  return {
    type: LOAD_WHO_TO_FOLLOW_SUCCESS,
    users,
  };
}

export function loadWhoToFollowError() {
  return {
    type: LOAD_WHO_TO_FOLLOW_ERROR,
  };
}
