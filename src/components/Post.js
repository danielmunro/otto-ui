import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import { del, postJSON } from '@tkrotoff/fetch';
import nl2br from 'react-nl2br';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deletePost } from '../actions/post';
import { baseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function Post({post: {uuid, text, created_at, user: author}, user, onDelete}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { sessionToken, follows, setFollows } = useContext(Context);
  const navigate = useNavigate();
  const created = new Date(created_at);

  const tryDelete = async () => {
    await deletePost(sessionToken, uuid);
    onDelete();
    handleClose();
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  // todo -- remove loop here
  const follow = follows.find((f) => f.following.uuid === author.uuid);

  const followAuthor = async () => {
    const response = await postJSON(`${baseUrl}/user/${user.uuid}/follows`, {
      following: {
        uuid: author.uuid,
      },
    }, {
      headers: {
        'x-session-token': sessionToken,
      },
    });
    const data = await response.json();
    setFollows([...follows, data]);
  };

  const unfollowAuthor = async (followUuid) => {
    await del(`${baseUrl}/follow/${followUuid}`, {
      headers: {
        'x-session-token': sessionToken,
      },
    });
    setFollows(follows.filter((f) => f.uuid !== followUuid));
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
          <Button onClick={() => setIsDialogOpen(true)}>
            Delete
          </Button>
        )}
        { author.uuid !== user.uuid && (
          follow ? (
            <Button onClick={() => unfollowAuthor(follow.uuid) }>
              Unfollow
            </Button>
          ) : (
            <Button onClick={followAuthor}>
              Follow
            </Button>
          )
        ) }
      </CardActions>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete this post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure? This cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={tryDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
