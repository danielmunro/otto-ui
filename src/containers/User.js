import { get } from '@tkrotoff/fetch';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import Post from '../components/Post';
import { baseUrl } from '../utils/config';

export default function User() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
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

  return (
    <Container>
      <h2>{user.name}</h2>
      <p>{user.bio_message}</p>
      {posts.map((post) => (
        <Post post={post} user={user} key={post.uuid} />
      ))}
    </Container>
  )
}
