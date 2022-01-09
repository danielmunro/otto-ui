import { Button } from '@mui/material';
import { postJSON } from '@tkrotoff/fetch';
import React, { useContext, useState } from 'react';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import { baseUrl } from '../config';
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
    console.log("u", loggedInUser);
    const response = await postJSON(`${baseUrl}/post`, {
      user: {uuid: loggedInUser.uuid},
      text:  newPost,
    }, {
      headers: {
        'x-session-token': sessionToken,
      }
    });
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
