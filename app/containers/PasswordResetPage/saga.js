import { call, put, takeLatest, select } from 'redux-saga/effects';
import request, { put as putJson } from '../../utils/request';
import { pwResetError, pwResetLoaded } from '../App/actions';
import { SUBMIT_PW_RESET } from '../App/constants';
import { makeSelectEmail, makeSelectNewPassword } from './selectors';
import config from '../../config';

export function* attemptPwReset() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectNewPassword());
  const requestURL = `${config.API_ENDPOINT}/session`;

  try {
    const response = yield call(
      request,
      requestURL,
      putJson({ email, password }),
    );
    yield put(pwResetLoaded(response));
  } catch (err) {
    yield put(pwResetError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* pwResetData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SUBMIT_PW_RESET, attemptPwReset);
}
