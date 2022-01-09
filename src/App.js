import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { get, patchJSON } from '@tkrotoff/fetch';
import { useEffect, useState } from 'react';
import { baseUrl } from './utils/config';
import Home from './containers/Home';
import './App.css';
import Login from './containers/Login';
import PasswordReset from './containers/PasswordReset';
import Profile from './containers/Profile';
import Signup from './containers/Signup';
import Context from './utils/Context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
    action: {
      active: '#0052cc',
      activeOpacity: 1,
      hover: '#0052cc',
      hoverOpacity: 0.7,
      focus: '#0052cc',
      focusOpacity: 1,
      selected: '#0052cc',
      selectedOpacity: 1
    },
  },
});


function App() {
  const [sessionToken, setSessionToken] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  const appContext = {
    sessionToken,
    setSessionToken,
    loggedInUser,
    setLoggedInUser,
    userEmail,
    setUserEmail,
    isAppLoaded,
  };

  const refreshUser = async (token) => {
    const response = await get(`${baseUrl}/session?token=${token}`);
    const data = await response.json();
    setLoggedInUser(data.user);
    setIsAppLoaded(true);
  };

  useEffect(() => {
    (async () => {
      console.log("initialize user session");
      const token = localStorage.getItem("token");
      setSessionToken(token);
      if (!token) {
        console.log("no session found");
        setLoggedInUser(null);
        setIsAppLoaded(true);
        return;
      }
      try {
        await refreshUser(token);
      } catch (e) {
        try {
          const refreshResponse = await patchJSON(`${baseUrl}/session`, {token: sessionToken});
          const refreshData = await refreshResponse.json();
          setSessionToken(refreshData.token);
          localStorage.setItem("token", refreshData.token);
          await refreshUser(refreshData.token);
        } catch (e) {
        }
      }
    })();
  }, []);

  return (
    <Context.Provider value={appContext}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
