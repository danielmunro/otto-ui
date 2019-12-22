import { Snackbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import H2 from '../../components/H2';
import Post from '../../components/Post';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { loadFollowingUserPosts } from '../App/actions';
import { makeSelectPosts, makeSelectPostsLoaded } from '../App/selectors';
import style from './style';
import reducer from './reducer';
import saga from './saga';
import {
  changePostMessage,
  hidePostMessageSuccess,
  submitPostMessage,
} from './actions';
import messages from './messages';
import {
  makeSelectPostMessage,
  makeSelectPostMessageReadOnly,
  makeSelectPostMessageSuccess,
} from './selectors';

const key = 'viewFriendsPostsPage';

function ViewFriendsPostsPage({
  postMessage,
  onChangePostMessage,
  postsLoaded,
  onLoadPosts,
  onPostMessageSubmit,
  posts,
  showPostSuccessMessage,
  handleClosePostSuccess,
  postMessageReadOnly,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    if (!postsLoaded) {
      onLoadPosts();
    }
  });
  const classes = style();
  return (
    <Grid container>
      <Grid item xs={6}>
        <H2>
          <FormattedMessage {...messages.viewFriendsPostsHeader} />
        </H2>
        <form onSubmit={onPostMessageSubmit}>
          <TextField
            id="createPost"
            multiline
            rows={3}
            label={messages.createPost.defaultMessage}
            value={postMessage}
            fullWidth
            onChange={onChangePostMessage}
            className={postMessageReadOnly ? classes.postMessageReadOnly : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.postMessageButton}
          >
            Submit
          </Button>
        </form>
      </Grid>
      <Grid item xs={12}>
        <hr />
        {postsLoaded ? (
          <div className={classes.content}>
            {posts.map(post => (
              <div key={post.uuid}>
                <Post post={post} />
                <hr className={classes.hr} />
              </div>
            ))}
          </div>
        ) : (
          <span>Not loaded</span>
        )}
      </Grid>
      <Snackbar
        open={showPostSuccessMessage}
        autoHideDuration={6000}
        onClose={handleClosePostSuccess}
      >
        <SnackbarContent message={messages.postMessageSuccess.defaultMessage} />
      </Snackbar>
    </Grid>
  );
}

ViewFriendsPostsPage.propTypes = {
  postMessage: PropTypes.string,
  onChangePostMessage: PropTypes.func,
  onPostMessageSubmit: PropTypes.func,
  postsLoaded: PropTypes.bool,
  onLoadPosts: PropTypes.func,
  posts: PropTypes.array,
  showPostSuccessMessage: PropTypes.bool,
  handleClosePostSuccess: PropTypes.func,
  postMessageReadOnly: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  postsLoaded: makeSelectPostsLoaded(),
  postMessage: makeSelectPostMessage(),
  showPostSuccessMessage: makeSelectPostMessageSuccess(),
  postMessageReadOnly: makeSelectPostMessageReadOnly(),
  posts: makeSelectPosts(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadPosts: () => dispatch(loadFollowingUserPosts()),
    onChangePostMessage: evt => {
      const lastKey = evt.target.value.substring(evt.target.value.length - 1);
      if (lastKey === '\n') {
        dispatch(submitPostMessage());
        evt.preventDefault();
        return;
      }
      dispatch(changePostMessage(evt.target.value));
    },
    onPostMessageSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitPostMessage());
    },
    handleClosePostSuccess: () => {
      dispatch(hidePostMessageSuccess());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ViewFriendsPostsPage);
