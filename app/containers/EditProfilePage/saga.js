import { call, put, takeLatest } from 'redux-saga/effects';
import request, { put as httpPut } from '../../utils/request';
import { loadSessionUserSuccess } from '../App/actions';
import config from '../../config';
import { editProfileUserError, editProfileUserSuccess } from './actions';
import { EDIT_PROFILE_USER_SUBMIT } from './constants';

export function* attemptSubmitEditUserProfile({ user }) {
  const requestURL = `${config.API_ENDPOINT}/user`;

  try {
    const response = yield call(request, requestURL, httpPut({ ...user }));
    yield put(editProfileUserSuccess(response));
    yield put(loadSessionUserSuccess({ user: response }));
  } catch (err) {
    yield put(editProfileUserError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* editProfileUserData() {
  yield takeLatest(EDIT_PROFILE_USER_SUBMIT, attemptSubmitEditUserProfile);
}
