import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { get, patchJSON } from '@tkrotoff/fetch';
import { useEffect, useState } from 'react';
import { getFollowPostsForUser } from './actions/post';
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
  const [posts, setPosts] = useState([]);

  const appContext = {
    sessionToken,
    setSessionToken,
    loggedInUser,
    setLoggedInUser,
    userEmail,
    setUserEmail,
    isAppLoaded,
    posts,
  };

  const getPosts = async (token, user) => {
    const response = await getFollowPostsForUser(token, user.uuid);
    const data = await response.json();
    setPosts(data);
  };

  const getUser = async (token) => {
    const response = await get(`${baseUrl}/session?token=${token}`);
    const data = await response.json();
    setLoggedInUser(data.user);
    await getPosts(token, data.user);
    setIsAppLoaded(true);
  };

  const refreshSession = async (token) => {
    const response = await patchJSON(
      `${baseUrl}/session`,
      {
        token,
      });
    const data = await response.json();
    setSessionToken(data.token);
    localStorage.setItem("token", data.token);
    return data.token
  }

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
        await getUser(token);
      } catch (e) {
        try {
          const refreshToken = await refreshSession(token);
          await getUser(refreshToken);
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
