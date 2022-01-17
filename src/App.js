import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { get, patchJSON } from '@tkrotoff/fetch';
import { useEffect, useState } from 'react';
import Post from './containers/Post';
import UpdateProfile from './containers/UpdateProfile';
import User from './containers/User';
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
      main: '#e71d36',
    },
    secondary: {
      main: '#95d5b2',
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
  const [follows, setFollows] = useState([]);

  const appContext = {
    sessionToken,
    setSessionToken,
    loggedInUser,
    setLoggedInUser,
    userEmail,
    setUserEmail,
    isAppLoaded,
    posts,
    setPosts,
    follows,
    setFollows,
  };

  const getUser = async (token) => {
    const response = await get(`${baseUrl}/session?token=${token}`);
    const data = await response.json();
    setLoggedInUser(data.user);
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

  useEffect(() => {
    if (loggedInUser) {
      (async function () {
        const response = await get(`${baseUrl}/user/${loggedInUser.uuid}/follows`);
        const data = await response.json();
        setFollows(data);
      })();
    }
  }, [loggedInUser]);

  return (
    <Context.Provider value={appContext}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/user/:uuid" element={<User />} />
            <Route path="/post/:uuid" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
