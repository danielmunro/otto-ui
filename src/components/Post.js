import {
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import nl2br from 'react-nl2br';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({post: {uuid, text, created_at}, user}) {
  const created = new Date(created_at);
  return (
    <Card variant="outlined" sx={{minWidth: 300, maxWidth: 680, marginBottom: "10px", marginTop: "10px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          <Link to={`/user/${user.uuid}`}>
            {user.name ? user.name : "(no name)"}
          </Link>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {created.toLocaleString()}
        </Typography>
        <Typography>
          {nl2br(text)}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/post/${uuid}`}>
          Link
        </Link>
      </CardActions>
    </Card>
  );
}
