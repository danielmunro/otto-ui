/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import { SUBMIT_LOGIN } from 'containers/App/constants';
import {
  // reposLoaded,
  repoLoadingError,
  // loginLoaded,
} from 'containers/App/actions';

// import request from 'utils/request';
// import { makeSelectUsername } from 'containers/HomePage/selectors';
// import { makeSelectEmail } from './selectors';

/**
 * Github repos request/response handler
 */
export function* attemptLogin() {
  // const email = yield select(makeSelectEmail());
  // const password = yield select(makeSelectEmail());
  // const requestURL = `https://localhost:8081`;

  try {
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, requestURL);
    // yield put(loginLoaded(repos, username));
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
