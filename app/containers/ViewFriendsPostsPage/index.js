import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import H2 from '../../components/H2';
import { loadFollowingUserPosts } from '../App/actions';
import { makeSelectPostsLoaded } from '../App/selectors';
import messages from './messages';

// const key = 'view-friend-posts-page';

function ViewFriendsPostsPage({ postsLoaded, onLoadPosts }) {
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
      {postsLoaded ? <span>Loaded</span> : <span>Not loaded</span>}
    </Grid>
  );
}

ViewFriendsPostsPage.propTypes = {
  postsLoaded: PropTypes.bool,
  onLoadPosts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  postsLoaded: makeSelectPostsLoaded(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadPosts: () => dispatch(loadFollowingUserPosts()),
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
