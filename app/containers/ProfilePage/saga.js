import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { API_ENDPOINT } from '../App/constants';
import { loadProfileUserError, loadProfileUserSuccess } from './actions';
import { LOAD_PROFILE_USER } from './constants';

export function* attemptLoadUserProfile({ username }) {
  const requestURL = `${API_ENDPOINT}/user/${username}`;

  try {
    const response = yield call(request, requestURL);
    yield put(loadProfileUserSuccess(response));
  } catch (err) {
    yield put(loadProfileUserError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadProfileUserData() {
  yield takeLatest(LOAD_PROFILE_USER, attemptLoadUserProfile);
}
