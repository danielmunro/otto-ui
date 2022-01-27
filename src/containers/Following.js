import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFollowing } from '../actions/follow';
import { getUserByUsername } from '../actions/user';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';

export default function Following() {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const params = useParams();

  useEffect(() => {
    (async function() {
      const response = await getUserByUsername(params.username);
      const data = await response.json();
      setUser(data);
    })();
  }, []);

  useEffect(() => {
    if (user) {
      (async function() {
        const response = await getFollowing(user.username);
        const data = await response.json();
        setFollowing(data);
      })();
    }
  }, [user]);

  if (!user) {
    return (
      <Container>
        <CircularIndeterminate />
      </Container>
    );
  }

  return (
    <Container title={`Users @${user.username} Follows`}>
      {following.map((f) => (
        <p key={f.uuid}>
          <Link to={`/u/${f.following.username}`}>@{f.following.username}</Link>
        </p>
      ))}
    </Container>
  );
}
