/**
 * WhoToFollowPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectWhoToFollow = state => state['who-to-follow-page'] || initialState;

const makeSelectWhoToFollowLoaded = () =>
  createSelector(
    selectWhoToFollow,
    state => state.whoToFollowLoaded,
  );

const makeSelectUsersToFollow = () =>
  createSelector(
    selectWhoToFollow,
    state => state.usersToFollow,
  );

export {
  selectWhoToFollow,
  makeSelectWhoToFollowLoaded,
  makeSelectUsersToFollow,
};
