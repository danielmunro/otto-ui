/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, select } from 'redux-saga/effects';
import { SUBMIT_LOGIN } from '../App/constants';
import { repoLoadingError, loginLoaded } from '../App/actions';

import request from '../../utils/request';
import { makeSelectEmail, makeSelectPassword } from './selectors';

/**
 * Github repos request/response handler
 */
export function* attemptLogin() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const requestURL = `http://localhost:8000/session`;

  try {
    const session = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    yield put(loginLoaded(session));
  } catch (err) {
    yield put(repoLoadingError(err));
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
