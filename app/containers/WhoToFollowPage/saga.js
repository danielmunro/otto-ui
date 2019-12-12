import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { API_ENDPOINT } from '../App/constants';
import { attemptLoadUser } from '../App/saga';
import { makeSelectSessionUserUuid } from '../App/selectors';
import { loadWhoToFollowError, loadWhoToFollowSuccess } from './actions';
import { LOAD_WHO_TO_FOLLOW } from './constants';

export function* attemptLoadWhoToFollow() {
  let userUuid = yield select(makeSelectSessionUserUuid());
  if (!userUuid) {
    yield attemptLoadUser();
    userUuid = yield select(makeSelectSessionUserUuid());
  }
  const requestURL = `${API_ENDPOINT}/user/${userUuid}/suggested-follows`;

  try {
    const response = yield call(request, requestURL);
    yield put(loadWhoToFollowSuccess(response));
  } catch (err) {
    yield put(loadWhoToFollowError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* whoToFollowData() {
  yield takeLatest(LOAD_WHO_TO_FOLLOW, attemptLoadWhoToFollow);
}
