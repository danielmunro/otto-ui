import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import H2 from '../../components/H2';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { loadFollowingUserPosts } from '../App/actions';
import { makeSelectPostsLoaded } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { changePostMessage, submitPostMessage } from './actions';
import messages from './messages';
import { makeSelectPostMessage } from './selectors';

const key = 'viewFriendsPostsPage';

function ViewFriendsPostsPage({
  postMessage,
  onChangePostMessage,
  postsLoaded,
  onLoadPosts,
  onPostMessageSubmit,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    if (!postsLoaded) {
      onLoadPosts();
    }
  });
  return (
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
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {postsLoaded ? <span>Loaded</span> : <span>Not loaded</span>}
    </Grid>
  );
}

ViewFriendsPostsPage.propTypes = {
  postMessage: PropTypes.string,
  onChangePostMessage: PropTypes.func,
  onPostMessageSubmit: PropTypes.func,
  postsLoaded: PropTypes.bool,
  onLoadPosts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  postsLoaded: makeSelectPostsLoaded(),
  postMessage: makeSelectPostMessage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadPosts: () => dispatch(loadFollowingUserPosts()),
    onChangePostMessage: evt => dispatch(changePostMessage(evt.target.value)),
    onPostMessageSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitPostMessage());
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
