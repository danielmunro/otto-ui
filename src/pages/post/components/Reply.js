import { Paper, Typography } from '@mui/material';
import React from 'react';
import Avatar from './Avatar';

export default function Reply({ reply: { text, created_at, user }}) {
  const created = new Date(created_at);
  return (
    <Paper sx={{p: 1, mb: 1}}>
      <Avatar name={user.name} username={user.username} profilePic={user.profile_pic} />
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {created.toLocaleString()}
      </Typography>
      <Typography>{text}</Typography>
    </Paper>
  );
}
