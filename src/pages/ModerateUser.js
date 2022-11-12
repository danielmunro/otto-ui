import { Switch, Typography } from '@mui/material';
import { del, postJSON } from '@tkrotoff/fetch';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getUserByUsername } from '../actions/user';
import Container from '../components/Container';
import { baseUrl } from '../utils/config';
import Context from '../utils/Context';
import { canAdminister, Role } from '../utils/role';

export default function ModerateUser() {
  const [user, setUser] = useState();
  const params = useParams();
  const { username } = params;
  const { loggedInUser, sessionToken } = useContext(Context);

  const reloadUser = async () => {
    const response = await getUserByUsername(username);
    const data = await response.json();
    setUser(data);
  };

  const banUser = async () => {
    await postJSON(`${baseUrl}/ban/${username}`, {
      isBanned: true,
    }, {
      headers: {
        'x-session-token': sessionToken,
      }
    });
    const userUpdate = {...user};
    userUpdate.is_banned = true;
    setUser(userUpdate);
  };

  const unbanUser = async () => {
    await del(`${baseUrl}/ban/${username}`, {
      headers: {
        'x-session-token': sessionToken,
      }
    });
    const userUpdate = {...user};
    userUpdate.is_banned = false;
    setUser(userUpdate);
  };

  const toggleBan = (event) => {
    event.preventDefault();
    if (user.is_banned) {
      unbanUser();
      return null;
    }
    banUser();
  };

  useEffect(() => {
    (async function () {
      await reloadUser();
    })();
  }, []);

  if (!user || !loggedInUser) {
    return null;
  }

  if (!canAdminister(loggedInUser.role, Role.moderator)) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container title={`Moderate @${user.username}`}>
      <Typography>
        Role: {user.role}
      </Typography>
      <Typography>
        Is banned? <Switch checked={user.is_banned} onClick={toggleBan} />
      </Typography>
    </Container>
  );
}
