import Grid from '@material-ui/core/Grid';
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import H1 from '../../components/H1';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { loadProfileUser } from './actions';
import messages from './messages';
import { makeSelectUser, makeSelectUserLoaded } from './selectors';

const key = 'profile-page';

function ProfilePage({ userLoaded, onLoadUser }) {
  const { username } = useParams();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    if (!userLoaded) {
      onLoadUser(username);
    }
  });
  return (
    <Grid item xs={6}>
      <H1>
        <FormattedMessage {...messages.profileHeader} values={{ username }} />
      </H1>
    </Grid>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  userLoaded: PropTypes.bool,
  onLoadUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoaded: makeSelectUserLoaded(),
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
