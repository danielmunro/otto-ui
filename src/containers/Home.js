import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { createPost, getPosts as requestGetPosts } from '../actions/post';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import Context from '../utils/Context';
import HomeSignupPromo from './HomeSignupPromo';

export default function Home() {
  const { sessionToken, loggedInUser, isAppLoaded, posts, setPosts } = useContext(Context);
  const [newPost, setNewPost] = useState('');

  const getPosts = async (token) => {
    console.log("requesting posts")
    const response = await requestGetPosts(token);
    const data = await response.json();
    setPosts(data);
    console.log("posts found", data);
  };

  useEffect(() => {
    console.log("useEffect", isAppLoaded, loggedInUser)
    if (isAppLoaded && loggedInUser) {
      getPosts(sessionToken);
    }
  }, [isAppLoaded, loggedInUser]);

  if (!isAppLoaded || !loggedInUser) {
    return <HomeSignupPromo />;
  }

  const trySubmitNewPost = async (event) => {
    event.preventDefault();
    const response = await createPost(sessionToken, loggedInUser.uuid, newPost);
    if (response.status === 201) {
      setNewPost('');
    }
  };

  return (
    <Container>
      <form onSubmit={trySubmitNewPost}>
        <div>
          <TextInput
            label="Share something"
            variant="standard"
            onChangeValue={setNewPost}
            value={newPost}
            multiline={true}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
      {posts.map((post) => <div>
        Yolo
      </div>)}
    </Container>
  );
}
