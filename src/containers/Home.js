import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { createPost } from '../actions/post';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import Context from '../Context';
import HomeSignupPromo from './HomeSignupPromo';

export default function Home() {
  const { sessionToken, loggedInUser } = useContext(Context);
  const [newPost, setNewPost] = useState('');

  if (!sessionToken) {
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
    </Container>
  );
}
