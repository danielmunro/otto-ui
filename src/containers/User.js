import { Avatar, Button, Divider, Typography } from '@mui/material';
import { get } from '@tkrotoff/fetch';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createAlbum, getAlbums } from '../actions/album';
import {
  createFollow,
  deleteFollow,
  getFollowers,
  getFollowing
} from '../actions/follow';
import { getPostsForUser } from '../actions/post';
import { getUserByUsername } from '../actions/user';
import Album from '../components/Album';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import FollowDetails from '../components/FollowDetails';
import Post from '../components/Post';
import TextInput from '../components/TextInput';
import UserTabs from '../components/UserTabs';
import { baseUrl, imageBaseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function User() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const { follows, setFollows, loggedInUser, sessionToken, isLoggedIn, isAppLoaded } = useContext(Context);
  const params = useParams();

  const reloadUser = async () => {
    const response = await getUserByUsername(params.username);
    const data = await response.json();
    setUser(data);
  };

  const reloadPosts = async () => {
    const response = await getPostsForUser(sessionToken, params.username);
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

  const reloadAlbums = async () => {
    const response = await getAlbums(params.username);
    const data = await response.json();
    setAlbums(data);
  };

  useEffect(() => {
    if (isAppLoaded) {
      (async function () {
        await reloadUser();
        await reloadPosts();
        await reloadUserFollows();
        await reloadAlbums();
        setIsLoaded(true);
      })();
    }
  }, [isAppLoaded]);

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

  const cancelAddAlbum = () => {
    setShowNewAlbum(false);
    setNewAlbumName("");
  }

  const tryCreateAlbum = async () => {
    await createAlbum(sessionToken, newAlbumName);
    setNewAlbumName("");
    await reloadAlbums();
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

  return (
    <Container title={`${displayName}'s Profile`}>
      <div style={{paddingBottom: 10}}>
        <Avatar
          alt={user.username}
          src={profilePic}
          style={{ float: "left", marginRight: 10, width: 48, height: 48 }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <Typography style={{ fontSize: 12 }}>@{user.username}</Typography>
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
      <UserTabs
        posts={(<div>
          {posts.map((post) => (
            <Post post={post} key={post.uuid} />
          ))}
        </div>)}
        pictures={(<div>
          { !showNewAlbum && (
            <Button variant="outlined" onClick={() => setShowNewAlbum(true)}>
              Add Album
            </Button>
          )}
          { showNewAlbum && (
            <Button variant="outlined" onClick={cancelAddAlbum}>
              Cancel
            </Button>
          )}
          { showNewAlbum && (
            <div style={{marginTop: 10}}>
              <TextInput
                label="Album name"
                variant="outlined"
                onChangeValue={setNewAlbumName}
                value={newAlbumName}
                style={{width: 400}}
              />
              <Button style={{margin: 16}} onClick={tryCreateAlbum}>
                Create New Album
              </Button>
            </div>
          )}
          {albums.map((album) => (
            <Album album={album} key={album.uuid} />
          ))}
        </div>)}
      />
    </Container>
  )
}
