import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { createFollow, deleteFollow } from '../../../actions/follow';
import Context from '../../../utils/Context';

export default function FollowButtonToggle({ isSelf, user, follow, addFollow, removeFollow }) {
  const {
    isLoggedIn,
    sessionToken,
    loggedInUser,
  } = useContext(Context);

  const followUser = async () => {
    await createFollow(sessionToken, loggedInUser.uuid, user.uuid);
    addFollow();
  };

  const unfollowUser = async () => {
    await deleteFollow(sessionToken, follow.uuid);
    removeFollow();
  };

  return isLoggedIn && !isSelf && (
    follow ? (
      <Button onClick={unfollowUser}>
        Unfollow
      </Button>
    ) : (
      <Button onClick={followUser}>
        Follow
      </Button>
    )
  )
}
