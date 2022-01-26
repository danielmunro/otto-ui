import { Avatar, Button, Divider } from '@mui/material';
import { get } from '@tkrotoff/fetch';
import { useContext, useEffect, useState } from 'react';
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
import Post from '../components/Post';
import { baseUrl, imageBaseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function User() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { follows, setFollows, loggedInUser, sessionToken, isLoggedIn } = useContext(Context);
  const params = useParams();

  const reloadUser = async () => {
    const response = await getUserByUsername(params.username);
    const data = await response.json();
    setUser(data);
  };

  const reloadPosts = async () => {
    const response = await get(`${baseUrl}/user/${params.username}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  const reloadUserFollows = async () => {
    const followingResponse = await getFollowing(params.username);
    const followingData = await followingResponse.json();
    setFollowing(followingData);
    const followersResponse = await getFollowers(params.username);
    const followersData = await followersResponse.json();
    setFollowers(followersData);
  };

  useEffect(() => {
    (async function () {
      await reloadUser();
      await reloadPosts();
      await reloadUserFollows();
      setIsLoaded(true);
    })();
  }, []);

  const isSelf = loggedInUser && params.username === loggedInUser.username;
  const follow = follows.find((f) => f.following.username === params.username);

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

  return (
    <Container title={`${user.name}'s Profile`}>
      <Avatar
        alt={user.username}
        src={profilePic}
        style={{ float: "left", marginRight: 10 }}
      />
      <h2>{user.name}</h2>
      <p>@{user.username}</p>
      <p>{user.bio_message}</p>
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
      <Divider />
      <h3>Posts</h3>
      {posts.map((post) => (
        <Post post={post} key={post.uuid} />
      ))}
    </Container>
  )
}
