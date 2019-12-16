/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, select } from 'redux-saga/effects';
import { API_ENDPOINT } from '../App/constants';

import request, { post } from '../../utils/request';
import {
  makeSelectSessionToken,
  makeSelectSessionUserUuid,
} from '../App/selectors';
import {
  postMessageSubmittedError,
  postMessageSubmittedSuccess,
} from './actions';
import { SUBMIT_POST_MESSAGE } from './constants';
import { makeSelectPostMessage } from './selectors';

/**
 * Github repos request/response handler
 */
export function* submitPost() {
  const text = yield select(makeSelectPostMessage());
  const userUuid = yield select(makeSelectSessionUserUuid());
  const sessionToken = yield select(makeSelectSessionToken());
  const requestURL = `${API_ENDPOINT}/post`;

  try {
    const response = yield call(
      request,
      requestURL,
      post({ text, user: { uuid: userUuid } }, sessionToken),
    );
    yield put(postMessageSubmittedSuccess(response));
  } catch (err) {
    yield put(postMessageSubmittedError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* viewFriendsPostsData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SUBMIT_POST_MESSAGE, submitPost);
}
