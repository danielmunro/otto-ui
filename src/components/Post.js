import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
  Link, Card,
} from '@mui/material';
import nl2br from 'react-nl2br';
import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { createPostLike, deletePostLike } from '../actions/like';
import { deletePost } from '../actions/post';
import { imageBaseUrl } from '../utils/config';
import Context from '../utils/Context';
import PostMenu from './PostMenu';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export default function Post({
  post: {
    uuid,
    text,
    created_at,
    user: author,
    images,
    selfLiked,
    share,
  },
  onDelete,
  onUnlike,
  showReply,
  showShare,
  sharePostClick,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSelfLiked, setIsSelfLiked] = useState(selfLiked);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoggedIn, sessionToken, loggedInUser } = useContext(Context);
  const created = new Date(created_at);
  showShare = showShare === undefined || Boolean(showShare);
  onUnlike = onUnlike === undefined ? () => {} : onUnlike;
  const navigate = useNavigate();

  const tryDelete = async () => {
    await deletePost(sessionToken, uuid);
    onDelete();
    handleClose();
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const tryLikePost = async () => {
    await createPostLike(sessionToken, uuid);
    setIsSelfLiked(true);
  };

  const tryUnlikePost = async () => {
    await deletePostLike(sessionToken, uuid);
    onUnlike();
    setIsSelfLiked(false);
  };

  const authorDisplayName = author.name ? author.name : "";
  const profilePic = author.profile_pic ? `${imageBaseUrl}/${author.profile_pic}` : '';
  const needsExpand = text && text.length > 1000;

  return (
    <Card
      sx={{ p: 1, mb: 1 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      { isLoggedIn && loggedInUser.uuid === author.uuid && (
        <PostMenu
          handleDelete={() => setIsDialogOpen(true)}
          handleEdit={() => navigate(`/p-edit/${uuid}`)}
        />
      )}
      <Avatar
        alt={authorDisplayName}
        src={profilePic}
        style={{ float: "left", marginRight: 10 }}
        sx={{ width: 56, height: 56 }}
      />
      <div style={{width: "90%", paddingLeft: 72}}>
        <Typography variant="h6">
          <Link component={RouterLink} to={`/u/${author.username}`}>
            <b>{author.name}</b>
            <span style={{color: "#f17887", margin: "0 20px"}}>@{author.username}</span>
            <span style={{fontSize: "smaller"}}>{timeAgo.format(created)}</span>
          </Link>
        </Typography>
        <div style={{
          maxHeight: isExpanded ? "inherit" : 190,
          cursor: needsExpand ? "pointer" : "auto",
        }} className="post">
          <ReactMarkdown>
            {text}
          </ReactMarkdown>
        </div>
        { !isExpanded && needsExpand && (
          <ExpandMoreIcon />
        )}
        { share && (
          <Paper
            sx={{p: 1, mb: 1, }}
            elevation={0}
            variant="outlined"
          >
            <Avatar
              alt={share.user.name}
              src={share.user.profile_pic ? `${imageBaseUrl}/${share.user.profile_pic}` : ''}
              style={{ float: "left", marginRight: 10 }}
            />
            <Link component={RouterLink} to={`/u/${share.user.username}`}>
              {share.user.name} @{share.user.username}
            </Link>
            <Typography color="text.secondary">
              {new Date(share.created_at).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              {nl2br(share.text)}
            </Typography>
          </Paper>
        )}
        <div>
          {images && images.map((i) => (
            <Link component={RouterLink} to={`/i/${i.uuid}`} key={i.uuid}>
              <img src={`${imageBaseUrl}/${i.s3_key}`} className="post-gallery" alt="" />
            </Link>
          ))}
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        { showReply && (
          <Button component={RouterLink} to={`/p/${uuid}`}>
            <ChatBubbleOutlineIcon />
          </Button>
        )}
        { isLoggedIn && !isSelfLiked && (
          <Button onClick={tryLikePost}>
            <FavoriteBorderIcon />
          </Button>
        )}
        { isLoggedIn && isSelfLiked && (
          <Button onClick={tryUnlikePost}>
            <FavoriteIcon />
          </Button>
        )}
        { isLoggedIn && showShare && (
          <Button onClick={sharePostClick}>
            <RepeatIcon />
          </Button>
        )}
      </div>
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
