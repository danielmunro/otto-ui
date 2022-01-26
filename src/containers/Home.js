import { Button } from '@mui/material';
import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import { createPost, getPosts as requestGetPosts } from '../actions/post';
import Container from '../components/Container';
import Post from '../components/Post';
import TextInput from '../components/TextInput';
import Context from '../utils/Context';

export default function Home() {
  const { sessionToken, loggedInUser, isAppLoaded, posts, setPosts } = useContext(Context);
  const [newPost, setNewPost] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  const getPosts = async (token) => {
    const response = await requestGetPosts(token);
    const data = await response.json();
    setPosts(data ?? []);
  };

  useEffect(() => {
    if (isAppLoaded) {
      getPosts(sessionToken);
    }
  }, [isAppLoaded]);

  const trySubmitNewPost = async (event) => {
    event.preventDefault();
    const response = await createPost(sessionToken, loggedInUser.uuid, newPost);
    if (response.status === 201) {
      setNewPost('');
      await getPosts(sessionToken);
    }
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p !== post));
  };

  return (
    <Container title={"Home"}>
      { loggedInUser && (
        <form onSubmit={trySubmitNewPost}>
          <TextInput
            label="Share something"
            variant="standard"
            onChangeValue={setNewPost}
            value={newPost}
            multiline
            minRows={inputFocused ? 3 : 1}
            style={{width: 500}}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{marginLeft: 10, marginTop: 10}}
          >
            Submit
          </Button>
        </form>
      )}
      {posts.map((post) => (
        <Post post={post} key={post.uuid} onDelete={() => removePost(post)} />
      ))}
    </Container>
  );
}
