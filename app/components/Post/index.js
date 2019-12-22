import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import P from '../P';
import TimeSince from '../TimeSince';
import style from './style';
import noImage from '../../images/no-image.png';

/* eslint-disable camelcase */
function Post({
  post: {
    text,
    user: { username, profilePic },
    created_at,
  },
}) {
  const classes = style();
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <img
          src={profilePic || noImage}
          alt={`${username}'s profile`}
          width="100%"
        />
      </Grid>
      <Grid item xs={11}>
        <P className={classes.header}>{text}</P>
        <P className={classes.signature}>
          <Link to={`/profile/${username}`}>{username}</Link> ·{' '}
          <TimeSince date={created_at} />
        </P>
      </Grid>
    </Grid>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
