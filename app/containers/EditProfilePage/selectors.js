/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProfile = state => state['edit-profile-page'] || initialState;

const makeSelectUser = () =>
  createSelector(
    selectProfile,
    profileState => profileState.user,
  );

const makeSelectIsUserLoaded = () =>
  createSelector(
    selectProfile,
    profileState => profileState.isUserLoaded,
  );

export { selectProfile, makeSelectUser, makeSelectIsUserLoaded };
