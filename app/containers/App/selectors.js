/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectAuthResponse = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.authResponse,
  );

const makeSelectSessionToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.sessionToken,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectLoginError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loginError,
  );

const makeSelectPwResetError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.pwResetError,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectSessionUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );

const makeSelectSessionUserLoaded = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userLoaded,
  );

const makeSelectSessionUserUuid = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user.uuid,
  );

const makeSelectSessionUsername = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user.username,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectPostsLoaded = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.postsLoaded,
  );

const makeSelectPosts = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.posts,
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectLoginError,
  makeSelectAuthResponse,
  makeSelectSessionToken,
  makeSelectPwResetError,
  makeSelectSessionUser,
  makeSelectSessionUserLoaded,
  makeSelectSessionUserUuid,
  makeSelectPostsLoaded,
  makeSelectSessionUsername,
  makeSelectPosts,
};
