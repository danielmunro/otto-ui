import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getUserByUsername } from '../actions/user';
import Container from '../components/Container';
import { canAdminister } from '../utils/role';

export default function ModerateUser({ role }) {
  const [user, setUser] = useState();
  const params = useParams();
  const { username } = params;

  const reloadUser = async () => {
    const response = await getUserByUsername(username);
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    (async function () {
      await reloadUser();
    })();
  }, []);

  if (!user) {
    return null;
  }

  if (!canAdminister(user, "moderator")) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container title={`Moderate @${user.username}`}>
      <Typography>
        Role: {user.role}
      </Typography>
    </Container>
  );
}
