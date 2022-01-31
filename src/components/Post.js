import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Paper,
  Typography
} from '@mui/material';
import nl2br from 'react-nl2br';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../actions/post';
import { imageBaseUrl } from '../utils/config';
import Context from '../utils/Context';
import PostMenu from './PostMenu';

export default function Post({post: {uuid, text, created_at, user: author, images}, onDelete, showReply}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoggedIn, sessionToken } = useContext(Context);
  const created = new Date(created_at);

  const tryDelete = async () => {
    await deletePost(sessionToken, uuid);
    onDelete();
    handleClose();
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const authorDisplayName = author.name ? author.name : "(no name)";
  const profilePic = author.profile_pic ? `${imageBaseUrl}/${author.profile_pic}` : '';

  return (
    <Paper sx={{p: 1}}>
      <Typography>
        <Avatar
          alt={authorDisplayName}
          src={profilePic}
          style={{ float: "left", marginRight: 10 }}
        />
        <Link to={`/u/${author.username}`}>
          @{author.username}
        </Link>
        <PostMenu handleDelete={() => setIsDialogOpen(true)} />
      </Typography>
      <Typography color="text.secondary">
        {created.toLocaleString()}
      </Typography>
      <Typography>
        {nl2br(text)}
      </Typography>
      <div>
        {images && images.map((i) => (
          <Link to={`/i/${i.uuid}`} key={i.uuid}>
            <img src={`${imageBaseUrl}/${i.s3_key}`} className="post-gallery" alt="" />
          </Link>
        ))}
      </div>
      { showReply && (
        <Button component={Link} to={`/p/${uuid}`}>
          Reply
        </Button>
      )}
      { isLoggedIn && (
        <Button>
          Like
        </Button>
      )}
      { isLoggedIn && (
        <Button>
          Share
        </Button>
      )}
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
    </Paper>
  );
}
