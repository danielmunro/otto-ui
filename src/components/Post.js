import {
  Avatar,
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
import nl2br from 'react-nl2br';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createFollow, deleteFollow } from '../actions/follow';
import { deletePost } from '../actions/post';
import { imageBaseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function Post({post: {uuid, text, created_at, user: author, images}, onDelete, showDelete, showPermalink}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoggedIn, sessionToken, follows, setFollows, loggedInUser } = useContext(Context);
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
    <Card variant="outlined" sx={{marginBottom: "10px", marginTop: "10px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          <Avatar
            alt={authorDisplayName}
            src={profilePic}
            style={{ float: "left", marginRight: 10, width: 48, height: 48 }}
          />
          <Link to={`/u/${author.username}`}>
            {author.username}
          </Link>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
      </CardContent>
      <CardActions>
        { showPermalink && (
          <Button component={Link} to={`/post/${uuid}`}>
            Permalink
          </Button>
        )}
        { isLoggedIn && (
          <div>
            { author.uuid === loggedInUser.uuid && (showDelete || showDelete === undefined) && (
              <Button onClick={() => setIsDialogOpen(true)}>
                Delete
              </Button>
            )}
          </div>
        )}
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
