import { get } from '@tkrotoff/fetch';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import logo from '../logo.svg';
import { baseUrl } from '../utils/config';
import { default as PostComponent } from '../components/Post';
import Context from '../utils/Context';

export default function Post() {
  const { loggedInUser, posts } = useContext(Context);
  const [post, setPost] = useState(null);
  const params = useParams();

  useEffect(() => {
    for (const p of posts) {
      if (p.uuid === params.uuid) {
        setPost(p);
        return;
      }
    }
    (async function() {
      const response = await get(`${baseUrl}/post/${params.uuid}`);
      const data = await response.json();
      setPost(data);
    })()
  }, []);

  if (!post || !loggedInUser) {
    return <img src={logo} className="App-logo" alt="logo" />;
  }

  return (
    <Container>
      <PostComponent post={post} user={loggedInUser} />
    </Container>
  )
}
