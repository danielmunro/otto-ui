import { Avatar as MUIAvatar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { imageBaseUrl } from '../../../utils/config';

export default function Avatar({ name, profilePic, username }) {
  const fullPathProfilePic = profilePic ? `${imageBaseUrl}/${profilePic}` : '';
  return (
    <Typography variant="h5">
      <MUIAvatar
        alt={name}
        src={fullPathProfilePic}
        style={{ float: "left", marginRight: 10, width: 48, height: 48 }}
      />
      <Link to={`/u/${username}`}>
        {username}
      </Link>
    </Typography>
  );
}
