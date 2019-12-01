import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { pwResetError, pwResetLoaded } from '../App/actions';
import { SUBMIT_PW_RESET } from '../App/constants';
import { makeSelectEmail, makeSelectNewPassword } from './selectors';

export function* attemptPwReset() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectNewPassword());
  const requestURL = `http://localhost:8000/session`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
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
