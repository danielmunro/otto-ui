import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import H1 from '../../components/H1';
import P from '../../components/P';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from '../ProfilePage/reducer';
import saga from '../ProfilePage/saga';
import { loadProfileUser } from './actions';
import messages from './messages';
import { makeSelectSessionUser } from '../App/selectors';

const key = 'profile-page';

function ProfilePage({ user }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  return (
    <Grid item xs={6}>
      <H1>
        <FormattedMessage
          {...messages.editProfileHeader}
          values={{ username: user.username ? user.username : '' }}
        />
      </H1>
      <form>
        <TextField value={user.username} readOnly />
      </form>
      <P>Username: {user.username}</P>
      <P>Name: {user.name}</P>
      <P>Member since: {user.created_at}</P>
    </Grid>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectSessionUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadUser: usernameParam => dispatch(loadProfileUser(usernameParam)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProfilePage);
