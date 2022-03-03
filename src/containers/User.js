import { Avatar, Button, Chip, Divider, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  createFollow,
  deleteFollow,
  getFollowers,
  getFollowing
} from '../actions/follow';
import { getUserByUsername } from '../actions/user';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import FollowDetails from '../components/FollowDetails';
import UserTabs from '../components/UserTabs';
import { imageBaseUrl } from '../utils/config';
import Context from '../utils/Context';
import Albums from './Albums';
import Likes from './Likes';
import Posts from './Posts';

export default function User() {
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tab, setTab] = useState("posts");
  const {
    follows,
    setFollows,
    loggedInUser,
    sessionToken,
    isLoggedIn,
    isAppLoaded,
  } = useContext(Context);
  const params = useParams();
  const username = params.username;

  const reloadUser = async () => {
    const response = await getUserByUsername(username);
    const data = await response.json();
    setUser(data);
  };

  const reloadUserFollows = async () => {
    const followingResponse = await getFollowing(username);
    const followingData = await followingResponse.json();
    setFollowing(followingData);
    const followersResponse = await getFollowers(username);
    const followersData = await followersResponse.json();
    setFollowers(followersData);
  };

  useEffect(() => {
    setIsLoaded(false);
    if (isAppLoaded) {
      (async function () {
        await reloadUser();
        await reloadUserFollows();
        setIsLoaded(true);
      })();
    }
  }, [isAppLoaded, username]);

  const isSelf = loggedInUser && username === loggedInUser.username;
  const follow = follows.find((f) => f.following.username === username);

  const followUser = async () => {
    const response = await createFollow(sessionToken, loggedInUser.uuid, user.uuid);
    const data = await response.json();
    setFollows([...follows, data]);
  };

  const unfollowUser = async () => {
    await deleteFollow(sessionToken, follow.uuid);
    setFollows(follows.filter((f) => f.uuid !== follow.uuid));
  };

  const profilePic = user.profile_pic ? `${imageBaseUrl}/${user.profile_pic}` : '';

  if (!isLoaded) {
    return (
      <Container>
        <CircularIndeterminate />
      </Container>
    );
  }

  const displayName = user.name || '@' + user.username;
  let tabToDisplay;
  if (tab === "posts") {
    tabToDisplay = <Posts username={username} />;
  } else if (tab === "albums") {
    tabToDisplay = <Albums username={username} />;
  } else if (tab === "likes") {
    tabToDisplay = <Likes username={username} />;
  }

  let chip = null;
  const { role } = user;
  if (role === "admin") {
    chip = <Chip label="Admin" color="primary" variant="outlined" sx={{ml: 1}} size="small" />;
  } else if (role === "moderator") {
    chip = <Chip label="Moderator" color="secondary" variant="outlined" sx={{ml: 1}} size="small" />;
  }

  return (
    <Container title={`${displayName}'s Profile`}>
      <div style={{paddingBottom: 10}}>
        <Avatar
          alt={user.username}
          src={profilePic}
          style={{ float: "left", marginRight: 10, width: 48, height: 48 }}
        />
        <Typography variant="h5">
          {user.name}
          {chip}
        </Typography>
        <Typography style={{ fontSize: 12 }}>
          @{user.username}
        </Typography>
      </div>
      <Typography>{user.bio_message}</Typography>
      <FollowDetails username={user.username} follows={following} followers={followers} />
      { isLoggedIn && !isSelf && (
        follow ? (
            <Button onClick={unfollowUser}>
              Unfollow
            </Button>
          ) : (
            <Button onClick={followUser}>
              Follow
            </Button>
          )
      )}
      <Divider sx={{mt: 1, mb: 1}} />
      <UserTabs onChange={(value) => setTab(value)}>
        {tabToDisplay}
      </UserTabs>
    </Container>
  )
}
