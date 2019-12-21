import Grid from '@material-ui/core/Grid';
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import H1 from '../../components/H1';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import style from './style';
import { loadProfileUser } from './actions';
import messages from './messages';
import { makeSelectUser, makeSelectUserLoaded } from './selectors';
import noImage from '../../images/no-image.png';

const key = 'profile-page';

function ProfilePage({ userLoaded, onLoadUser, user }) {
  const { username } = useParams();
  const classes = style();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    if (!userLoaded) {
      onLoadUser(username);
    }
  });
  const createdAt = new Date(user.created_at);
  return (
    <Grid container>
      <Grid item xs={2}>
        <img
          src={user.profilePic || noImage}
          alt={`${user.username}'s profile`}
          width="100%"
        />
      </Grid>
      <Grid item xs={10}>
        <H1>
          <FormattedMessage {...messages.profileHeader} values={{ username }} />
        </H1>
        <Link to="/edit-profile">Edit Profile</Link>
        <Grid container className={classes.row}>
          <Grid item xs={2} className={classes.profileHeader}>
            Username
          </Grid>
          <Grid item xs={10}>
            {user.username}
          </Grid>
        </Grid>
        <Grid container className={classes.row}>
          <Grid item xs={2} className={classes.profileHeader}>
            Name
          </Grid>
          <Grid item xs={10}>
            {user.name}
          </Grid>
        </Grid>
        <Grid container className={classes.row}>
          <Grid item xs={2} className={classes.profileHeader}>
            Joined
          </Grid>
          <Grid item xs={10}>
            {createdAt.getMonth()}/{createdAt.getDate()}/
            {createdAt.getFullYear()}
          </Grid>
        </Grid>
        <Grid container className={classes.row}>
          <Grid item xs={2} className={classes.profileHeader}>
            Bio
          </Grid>
          <Grid item xs={10}>
            {user.bio_message}
          </Grid>
        </Grid>
      </Grid>
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
