/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, select } from 'redux-saga/effects';
import { SUBMIT_LOGIN } from '../App/constants';
import { loginLoaded, loginLoadedError } from '../App/actions';
import config from '../../config';
import request, { post } from '../../utils/request';
import { makeSelectEmail, makeSelectPassword } from './selectors';

/**
 * Github repos request/response handler
 */
export function* attemptLogin() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const requestURL = `${config.API_ENDPOINT}/session`;

  try {
    const response = yield call(request, requestURL, post({ email, password }));
    yield put(loginLoaded(response));
  } catch (err) {
    yield put(loginLoadedError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SUBMIT_LOGIN, attemptLogin);
}
