import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFollowers } from '../actions/follow';
import { getUserByUsername } from '../actions/user';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';

export default function Followers() {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
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
        const response = await getFollowers(user.username);
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
    <Container title={`Users Following @${user.username}`}>
      {followers.map((f) => (
        <p key={f.uuid}>
          <Link to={`/u/${f.user.username}`}>@{f.user.username || "nousername"}</Link>
        </p>
      ))}
    </Container>
  );
}
