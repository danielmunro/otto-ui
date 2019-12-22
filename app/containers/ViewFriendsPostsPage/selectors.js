import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectViewPosts = state => state.viewFriendsPostsPage || initialState;

const makeSelectPostMessage = () =>
  createSelector(
    selectViewPosts,
    viewPostsState => viewPostsState.postMessage,
  );

const makeSelectPostMessageSuccess = () =>
  createSelector(
    selectViewPosts,
    viewPostsState => viewPostsState.showPostSuccessMessage,
  );

const makeSelectPostMessageReadOnly = () =>
  createSelector(
    selectViewPosts,
    viewPostsState => viewPostsState.postMessageReadOnly,
  );

export {
  makeSelectPostMessage,
  makeSelectPostMessageSuccess,
  makeSelectPostMessageReadOnly,
};
