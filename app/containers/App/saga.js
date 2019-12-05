/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  API_ENDPOINT,
  LOAD_FOLLOWING_POSTS,
  LOAD_SESSION_USER,
} from './constants';
import {
  loadFollowingUserPostsError,
  loadFollowingUserPostsSuccess,
  loadSessionUserError,
  loadSessionUserSuccess,
} from './actions';
import request from '../../utils/request';
import { makeSelectSessionToken, makeSelectSessionUserUuid } from './selectors';

/**
 * Load user
 */
export function* attemptLoadUser() {
  const sessionToken = yield select(makeSelectSessionToken());
  const requestURL = `${API_ENDPOINT}/session?token=${sessionToken}`;

  try {
    const response = yield call(request, requestURL);
    yield put(loadSessionUserSuccess(response));
  } catch (err) {
    yield put(loadSessionUserError());
  }
}

/**
 * Load following posts
 */
export function* attemptLoadFollowingPosts() {
  const userUuid = yield select(makeSelectSessionUserUuid());
  if (!userUuid) {
    yield attemptLoadUser();
  }
  const requestURL = `${API_ENDPOINT}/user/${userUuid}/following-posts`;

  try {
    const response = yield call(request, requestURL);
    yield put(loadFollowingUserPostsSuccess(response));
  } catch (err) {
    yield put(loadFollowingUserPostsError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appData() {
  yield takeLatest(LOAD_SESSION_USER, attemptLoadUser);
  yield takeLatest(LOAD_FOLLOWING_POSTS, attemptLoadFollowingPosts);
}
