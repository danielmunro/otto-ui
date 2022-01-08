import { useContext, useEffect, useState } from 'react';
import { get, patchJSON } from '@tkrotoff/fetch';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { baseUrl } from '../config';
import Context from '../Context';

export default function Profile() {
  const [user, setUser] = useState(null);
  const { sessionToken, setSessionToken } = useContext(Context);
  const navigate = useNavigate();
  const refreshUser = async () => {
    const response = await get(`${baseUrl}/session?token=${sessionToken}`);
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    (async () => {
      if (!sessionToken) {
        setUser(null);
        return;
      }
      try {
        await refreshUser();
      } catch (e) {
        try {
          const refreshResponse = await patchJSON(`${baseUrl}/session`, {token: sessionToken});
          const refreshData = await refreshResponse.json();
          setSessionToken(refreshData.token);
          await refreshUser();
        } catch (e) {
          navigate("/login");
        }
      }
    })();
  }, [sessionToken]);

  return (
    <Container>
      <h1>Profile</h1>
    </Container>
  );
}
