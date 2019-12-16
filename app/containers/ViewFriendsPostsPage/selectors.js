import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectViewPosts = state => state.viewFriendsPostsPage || initialState;

const makeSelectPostMessage = () =>
  createSelector(
    selectViewPosts,
    viewPostsState => viewPostsState.postMessage,
  );

export { makeSelectPostMessage };
