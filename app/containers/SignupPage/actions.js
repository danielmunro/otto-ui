/*
 * Home Actions
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
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CONFIRM,
  CHANGE_USERNAME,
} from './constants';

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function changePasswordConfirm(passwordConfirm) {
  return {
    type: CHANGE_PASSWORD_CONFIRM,
    passwordConfirm,
  };
}
