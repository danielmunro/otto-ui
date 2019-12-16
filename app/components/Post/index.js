import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';

function Post({ user: { username, profilePic }, message: { text } }) {
  return (
    <div>
      <Grid xs={1}>
        <img src={profilePic} alt={`${username}'s profile`} />
      </Grid>
      <Grid xs={7}>{text}</Grid>
    </div>
  );
}

Post.propTypes = {
  user: PropTypes.object,
  message: PropTypes.object,
};

export default Post;
