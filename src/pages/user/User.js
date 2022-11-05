import {
  Avatar,
  Button,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  getFollowers,
  getFollowing
} from '../../actions/follow';
import { getUserByUsername } from '../../actions/user';
import CircularIndeterminate from '../../components/CircularIndeterminate';
import Container from '../../components/Container';
import FollowButtonToggle from './components/FollowButtonToggle';
import FollowDetails from './components/FollowDetails';
import UserTabs from './components/UserTabs';
import { imageBaseUrl } from '../../utils/config';
import Context from '../../utils/Context';
import { canAdminister, Role } from '../../utils/role';
import Albums from '../Albums';
import Likes from '../Likes';
import Posts from '../Posts';

export default function User() {
  const [notFound, setNotFound] = useState(false);
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tab, setTab] = useState("posts");
  const navigate = useNavigate();

  const {
    follows,
    setFollows,
    loggedInUser,
    isAppLoaded,
  } = useContext(Context);
  const params = useParams();
  const username = params.username;

  const reloadUser = async () => {
    try {
      const response = await getUserByUsername(username);
      const data = await response.json();
      setUser(data);
    } catch (e) {
      setNotFound(true);
      setIsLoaded(true);
    }
  };

  const reloadFollowing = async () => {
    const followingResponse = await getFollowing(username);
    const followingData = await followingResponse.json();
    setFollowing(followingData);
  };

  const reloadFollowers = async () => {
    const followersResponse = await getFollowers(username);
    const followersData = await followersResponse.json();
    setFollowers(followersData);
    return followersData;
  };

  const reloadUserFollows = async () => {
    await reloadFollowing();
    await reloadFollowers();
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

  const addFollow = async () => {
    const data = await reloadFollowers();
    setFollows(data);
  };

  const removeFollow = () => {
    const newFollows = followers.filter((f) => f.uuid !== follow.uuid);
    setFollowers(newFollows);
    setFollows(newFollows);
  };

  if (!isLoaded) {
    return (
      <Container>
        <CircularIndeterminate />
      </Container>
    );
  }

  const profilePic = user.profile_pic ? `${imageBaseUrl}/${user.profile_pic}` : '';
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
  if (role === Role.admin) {
    chip = <Chip label="Admin" color="primary" variant="outlined" sx={{ml: 1}} size="small" />;
  } else if (role === Role.moderator) {
    chip = <Chip label="Moderator" color="secondary" variant="outlined" sx={{ml: 1}} size="small" />;
  }

  const canAdmin = loggedInUser && canAdminister(loggedInUser.role, Role.moderator) && loggedInUser.uuid !== user.uuid;
  const isSelf = loggedInUser && username === loggedInUser.username;
  const follow = follows.find((f) => f.following.username === username);

  if (notFound) {
    return (
      <Container title="User not found">
        <Typography variant="h1">Sorry! They were not found</Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          startIcon={<ChevronLeftIcon />}
        >
          Go Back
        </Button>
      </Container>
    )
  }

  return (
    <Container title={`${displayName}'s Profile`}>
      <Avatar
        alt={user.username}
        src={profilePic}
        style={{ marginRight: 10, width: 128, height: 128 }}
      />
      <Typography variant="h5">
        {user.name}
        {chip}
      </Typography>
      <Typography variant="subtitle1">
        @{user.username}
      </Typography>
      <FollowDetails username={user.username} follows={following} followers={followers} />
      <Typography variant="body2">{user.bio_message}</Typography>
      <div>
        { canAdmin && (
          <Link to={`/moderate-user/${user.username}`}>Moderate User</Link>
        )}
        <FollowButtonToggle
          follow={follow}
          user={user}
          isSelf={isSelf}
          addFollow={addFollow}
          removeFollow={removeFollow}
        />
      </div>
      <Divider sx={{mt: 1, mb: 1}} />
      <UserTabs onChange={(value) => setTab(value)}>
        {tabToDisplay}
      </UserTabs>
    </Container>
  )
}
