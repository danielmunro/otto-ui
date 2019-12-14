/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProfile = state => state['profile-page'] || initialState;

const makeSelectUser = () =>
  createSelector(
    selectProfile,
    profileState => profileState.user,
  );

const makeSelectUserLoaded = () =>
  createSelector(
    selectProfile,
    profileState => profileState.userLoaded,
  );

export { selectProfile, makeSelectUser, makeSelectUserLoaded };
