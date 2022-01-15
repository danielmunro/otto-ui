import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import nl2br from 'react-nl2br';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deletePost } from '../actions/post';
import Context from '../utils/Context';

export default function Post({post: {uuid, text, created_at, user: author}, user, onDelete}) {
  const { sessionToken } = useContext(Context);
  const navigate = useNavigate();
  const created = new Date(created_at);

  const tryDelete = async () => {
    await deletePost(sessionToken, uuid);
    onDelete();
  };

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
        <Button onClick={() => navigate(`/post/${uuid}`)}>
          Link
        </Button>
        { author.uuid === user.uuid && (
          <Button onClick={tryDelete}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
