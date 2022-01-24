import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFollowing } from '../actions/follow';
import { getUser } from '../actions/user';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';

export default function Following() {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const params = useParams();

  useEffect(() => {
    (async function() {
      const response = await getUser(params.uuid);
      const data = await response.json();
      setUser(data);
    })();
  }, []);

  useEffect(() => {
    if (user) {
      (async function() {
        const response = await getFollowing(user.uuid);
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
    <Container>
      <h2>Users @{user.username} Follows</h2>
      {following.map((f) => (
        <p key={f.uuid}>
          <Link to={`/user/${f.following.uuid}`}>@{f.following.username || "nousername"}</Link>
        </p>
      ))}
    </Container>
  );
}
