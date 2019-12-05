import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '@material-ui/core/Container';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import H2 from '../../components/H2';
import { loadFollowingUserPosts } from '../App/actions';
import messages from './messages';

// const key = 'view-friend-posts-page';

function ViewFriendsPostsPage({ postsLoaded, onLoadPosts }) {
  useEffect(() => {
    if (!postsLoaded) {
      onLoadPosts();
    }
  });

  return (
    <Container maxWidth="sm">
      <div>
        <H2>
          <FormattedMessage {...messages.signupHeader} />
        </H2>
        {postsLoaded ? <span>Loaded</span> : <span>Not loaded</span>}
      </div>
    </Container>
  );
}

ViewFriendsPostsPage.propTypes = {
  postsLoaded: PropTypes.bool,
  onLoadPosts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

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
