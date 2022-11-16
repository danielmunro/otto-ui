import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAction } from '../actions/session';
import Context from '../utils/Context';

export function useLogin() {
  const {
    setLoggedInUser,
    setIsLoggedIn,
    setSessionToken,
    tryGetNotifications,
  } = useContext(Context);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  useEffect(async () => {
    if (response && response.status === 201) {
      const data = await response.json();
      if (data.AuthResponse === 3) {
        // failed
        return;
      }
      setLoggedInUser(data.User);
      setIsLoggedIn(true);
      setSessionToken(data.Token);
      localStorage.setItem("token", data.Token);
      await tryGetNotifications(data.Token);
      navigate("/");
    }
  }, [response]);
  return async (email, password) => {
    const response = await loginAction(email, password);
    setResponse(response);
    return response;
  }
}
