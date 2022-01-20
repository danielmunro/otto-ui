import { Avatar, Button } from '@mui/material';
import { get } from '@tkrotoff/fetch';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createFollow, deleteFollow } from '../actions/follow';
import Container from '../components/Container';
import Post from '../components/Post';
import { baseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function User() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const { follows, loggedInUser, sessionToken, setFollows, isLoggedIn } = useContext(Context);
  const params = useParams();

  const reloadUser = async () => {
    const response = await get(`${baseUrl}/user/${params.uuid}`);
    const data = await response.json();
    setUser(data);
  };

  const reloadPosts = async () => {
    const response = await get(`${baseUrl}/user/${params.uuid}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    (async function () {
      await reloadUser();
      await reloadPosts();
    })();
  }, []);

  const isSelf = loggedInUser && params.uuid === loggedInUser.uuid;
  const follow = follows.find((f) => f.following.uuid === params.uuid);

  const followUser = async () => {
    const response = await createFollow(sessionToken, loggedInUser.uuid, user.uuid);
    const data = await response.json();
    setFollows([...follows, data]);
  };

  const unfollowUser = async () => {
    await deleteFollow(sessionToken, follow.uuid);
    setFollows(follows.filter((f) => f.uuid !== follow.uuid));
  };

  console.log("is logged in", isLoggedIn);

  return (
    <Container>
      <Avatar
        alt={user.name}
        src={user.profile_pic}
        style={{ float: "left", marginRight: 10, width: 48, height: 48 }}
      />
      <h2>{user.name}</h2>
      <p>{user.bio_message}</p>
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
      {posts.map((post) => (
        <Post post={post} key={post.uuid} />
      ))}
    </Container>
  )
}
