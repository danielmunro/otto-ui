import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable camelcase */
function Post({
  post: {
    text,
    user: { username },
    created_at,
  },
}) {
  const profilePic = '';
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <img src={profilePic} alt={`${username}'s profile`} />
      </Grid>
      <Grid item xs={9}>
        On {created_at} {username} wrote: {text}
      </Grid>
    </Grid>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
