import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import ContentRow from '../../components/ContentRow';
import H1 from '../../components/H1';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import ColumnHead from './ColumnHead';
import ColumnValue from './ColumnValue';
import reducer from './reducer';
import saga from './saga';
import {
  changeProfilePicture,
  loadProfileUser,
  uploadProfilePicture,
} from './actions';
import messages from './messages';
import {
  makeSelectFilename,
  makeSelectProfileImage,
  makeSelectUser,
  makeSelectUserLoaded,
} from './selectors';
import noImage from '../../images/no-image.png';

const key = 'profile-page';

function ProfilePage({
  userLoaded,
  onLoadUser,
  user,
  onChangeImage,
  filename,
  onSubmitProfileImage,
}) {
  const { username } = useParams();
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
        <form onSubmit={onSubmitProfileImage}>
          <p>
            <input
              type="file"
              id="file"
              value={filename}
              onChange={onChangeImage}
            />
          </p>
          <p>
            <Button type="submit" onSubmit={onSubmitProfileImage}>
              Submit
            </Button>
          </p>
        </form>
      </Grid>
      <Grid item xs={10}>
        <H1>
          <FormattedMessage {...messages.profileHeader} values={{ username }} />
        </H1>
        <Link to="/edit-profile">Edit Profile</Link>
        <ContentRow>
          <ColumnHead>Username</ColumnHead>
          <ColumnValue>{user.username}</ColumnValue>
        </ContentRow>
        <ContentRow>
          <ColumnHead>Name</ColumnHead>
          <ColumnValue>{user.name}</ColumnValue>
        </ContentRow>
        <ContentRow>
          <ColumnHead>Joined</ColumnHead>
          <ColumnValue>
            {createdAt.getMonth()}/{createdAt.getDate()}/
            {createdAt.getFullYear()}
          </ColumnValue>
        </ContentRow>
        <ContentRow>
          <ColumnHead>Bio</ColumnHead>
          <ColumnValue>{user.bio_message}</ColumnValue>
        </ContentRow>
      </Grid>
    </Grid>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  userLoaded: PropTypes.bool,
  onLoadUser: PropTypes.func,
  profileImage: PropTypes.object,
  filename: PropTypes.string,
  onChangeImage: PropTypes.func,
  onSubmitProfileImage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoaded: makeSelectUserLoaded(),
  profileImage: makeSelectProfileImage(),
  filename: makeSelectFilename(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadUser: usernameParam => dispatch(loadProfileUser(usernameParam)),
    onChangeImage: evt =>
      dispatch(changeProfilePicture(evt.target.value, evt.target.files[0])),
    onSubmitProfileImage: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(uploadProfilePicture());
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
)(ProfilePage);
