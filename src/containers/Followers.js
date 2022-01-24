import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFollowers } from '../actions/follow';
import { getUser } from '../actions/user';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';

export default function Followers() {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
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
        const response = await getFollowers(user.uuid);
        const data = await response.json();
        setFollowers(data);
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
      <h2>Users Following {user.name}</h2>
      {followers.map((f) => (
        <p key={f.uuid}>
          <Link to={`/user/${f.user.uuid}`}>@{f.user.name || "nousername"}</Link>
        </p>
      ))}
    </Container>
  );
}
