import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '@material-ui/core/Container';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import H2 from '../../components/H2';
import { UserRow } from '../../components/UserRow';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { loadWhoToFollow } from './actions';
import messages from './messages';
import {
  makeSelectUsersToFollow,
  makeSelectWhoToFollowLoaded,
} from './selectors';

const key = 'who-to-follow-page';

function WhoToFollowPage({
  whoToFollowLoaded,
  onLoadWhoToFollow,
  usersToFollow,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    if (!whoToFollowLoaded) {
      onLoadWhoToFollow();
    }
  });
  console.log('sanity', whoToFollowLoaded, usersToFollow);
  return (
    <Container maxWidth="sm">
      <div>
        <H2>
          <FormattedMessage {...messages.viewFriendsPostsHeader} />
        </H2>
        {whoToFollowLoaded ? (
          <div>
            {usersToFollow.map(user => (
              <UserRow user={user} key={user.uuid} />
            ))}
          </div>
        ) : (
          <span>Not loaded</span>
        )}
      </div>
    </Container>
  );
}

WhoToFollowPage.propTypes = {
  whoToFollowLoaded: PropTypes.bool,
  onLoadWhoToFollow: PropTypes.func,
  usersToFollow: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  whoToFollowLoaded: makeSelectWhoToFollowLoaded(),
  usersToFollow: makeSelectUsersToFollow(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadWhoToFollow: () => dispatch(loadWhoToFollow()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WhoToFollowPage);
