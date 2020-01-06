import { select } from '@redux-saga/core/effects';
import { call, put, takeLatest } from 'redux-saga/effects';
import request, { postFile } from '../../utils/request';
import {
  makeSelectSessionToken,
  makeSelectSessionUserUuid,
} from '../App/selectors';
import { loadProfileUserError, loadProfileUserSuccess } from './actions';
import { LOAD_PROFILE_USER, UPLOAD_PROFILE_PICTURE } from './constants';
import { makeSelectProfileImage } from './selectors';
import config from '../../config';

export function* attemptLoadUserProfile({ username }) {
  const requestURL = `${config.API_ENDPOINT}/user/${username}`;

  try {
    const response = yield call(request, requestURL);
    yield put(loadProfileUserSuccess(response));
  } catch (err) {
    yield put(loadProfileUserError());
  }
}

export function* uploadProfilePicture() {
  const userUuid = yield select(makeSelectSessionUserUuid());
  const sessionToken = yield select(makeSelectSessionToken());
  const image = yield select(makeSelectProfileImage());
  const requestURL = `${config.API_ENDPOINT}/user/${userUuid}/image`;

  try {
    const response = yield call(
      request,
      requestURL,
      postFile(image, sessionToken),
    );
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
  yield takeLatest(UPLOAD_PROFILE_PICTURE, uploadProfilePicture);
}
