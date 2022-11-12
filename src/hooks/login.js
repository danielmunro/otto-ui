import { useContext, useEffect, useState } from 'react';
import { login as loginAction } from '../actions/session';
import Context from '../utils/Context';

export function useLogin() {
  const {
    setLoggedInUser,
    setIsLoggedIn,
    setSessionToken,
  } = useContext(Context);
  const [response, setResponse] = useState(null);
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
    }
  }, [response]);
  return async (email, password) => setResponse(await loginAction(email, password));
}
