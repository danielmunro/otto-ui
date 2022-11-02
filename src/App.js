import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { get, patchJSON } from '@tkrotoff/fetch';
import { useEffect, useState } from 'react';
import { getFollowers, getFollowing } from './actions/follow';
import ProtectedRoute from './components/ProtectedRoute';
import Album from './containers/Album';
import Followers from './containers/Followers';
import Following from './containers/Following';
import Image from './containers/Image';
import ModerateUser from './containers/ModerateUser';
import Post from './containers/Post';
import PostEdit from './containers/PostEdit';
import Splash from './containers/Splash';
import UpdateProfile from './containers/UpdateProfile';
import User from './containers/User';
import { baseUrl, env, primaryColor, secondaryColor } from './utils/config';
import Home from './containers/Home';
import './App.css';
import Login from './containers/Login';
import PasswordReset from './containers/PasswordReset';
import Signup from './containers/Signup';
import Context from './utils/Context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    action: {
      active: '#0052cc',
      hover: '#0052cc',
      focus: '#0052cc',
      selected: '#0052cc',
    },
    text: {
      primary: "#111",
    },
    background: {
      default: "#fcfdfd",
      paper: "#fefefe",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    action: {
      active: '#ccc',
      hover: '#2f54d0',
      focus: '#2f54d0',
      selected: '#2f54d0',
    },
    text: {
      primary: "#ccc",
    },
    background: {
      default: "#333",
      paper: "#3a3a3a",
    },
  },
});

function App() {
  const [sessionToken, setSessionToken] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [follows, setFollows] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [uiMode, setUiMode] = useState(localStorage.getItem("uiMode") ?? "light");

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
    followers,
    setFollowers,
    isLoggedIn,
    setIsLoggedIn,
    uiMode,
    setUiMode,
  };

  const getUser = async (token) => {
    const response = await get(`${baseUrl}/session?token=${token}`);
    const data = await response.json();
    setLoggedInUser(data.user);
    setIsLoggedIn(true);
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
  };

  const reloadFollowing = async () => {
    const response = await getFollowing(loggedInUser.username);
    const data = await response.json();
    setFollows(data);
  };

  const reloadFollowers = async () => {
    const response = await getFollowers(loggedInUser.username);
    const data = await response.json();
    setFollowers(data);
  };

  useEffect(() => {
    (async () => {
      console.log("initialize user session");
      const token = localStorage.getItem("token");
      setSessionToken(token);
      if (!token) {
        console.log("no session found");
        setLoggedInUser(null);
        setIsLoggedIn(false);
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
        await reloadFollowing();
        await reloadFollowers();
      })();
    }
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={uiMode === "light" ? lightTheme : darkTheme}>
      <Context.Provider value={appContext}>
        <Router>
          <Routes>
            <Route path="/u/:username" element={<User />} />
            <Route path="/u/:username/following" element={<Following />} />
            <Route path="/u/:username/followers" element={<Followers />} />
            <Route path="/i/:uuid" element={<Image />} />
            <Route path="/p/:uuid" element={<Post />} />
            <Route path="/p-edit/:uuid" element={<PostEdit />} />
            <Route path="/a/:uuid" element={<Album />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/update-profile" element={<ProtectedRoute component={UpdateProfile} />} />
            <Route path="/moderate-user/:username" element={<ProtectedRoute role="moderator" component={ModerateUser} />} />
            <Route path="/moderate-post/:uuid" element={<ProtectedRoute role="moderator" component={ModerateUser} />} />
            <Route path="/" element={env === "dev" ? <Home /> : <Splash />} />
          </Routes>
        </Router>
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
