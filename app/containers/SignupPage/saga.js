/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, select } from 'redux-saga/effects';
import { API_ENDPOINT, SUBMIT_SIGNUP } from '../App/constants';
import { signupLoaded, signupLoadedError } from '../App/actions';

import request, { post } from '../../utils/request';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectUsername,
} from './selectors';

/**
 * Github repos request/response handler
 */
export function* attemptSignup() {
  const email = yield select(makeSelectEmail());
  const username = yield select(makeSelectUsername());
  const password = yield select(makeSelectPassword());
  const requestURL = `${API_ENDPOINT}/user`;

  try {
    const response = yield call(
      request,
      requestURL,
      post({ email, username, password }),
    );
    yield put(signupLoaded(response));
  } catch (err) {
    yield put(signupLoadedError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* signupData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SUBMIT_SIGNUP, attemptSignup);
}
