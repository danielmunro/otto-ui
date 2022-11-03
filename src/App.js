import { ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getFollowers, getFollowing } from './actions/follow';
import { getUser, refreshSession } from './actions/session';
import ProtectedRoute from './components/ProtectedRoute';
import Album from './pages/Album';
import Followers from './pages/Followers';
import Following from './pages/Following';
import Image from './pages/Image';
import ModerateUser from './pages/ModerateUser';
import OTP from './pages/OTP';
import PostEdit from './pages/PostEdit';
import UpdateProfile from './pages/UpdateProfile';
import {
  User,
  Home,
  Post,
} from './pages';
import './App.css';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import Signup from './pages/Signup';
import Context from './utils/Context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { darkTheme, lightTheme } from './utils/theme';

function App() {
  const [sessionToken, setSessionToken] = useState(localStorage.getItem("token"));
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

  const tryGetUser = async (token) => {
    const response = await getUser(token);
    const data = await response.json();
    setLoggedInUser(data.user);
    setIsLoggedIn(true);
    setIsAppLoaded(true);
  };

  const tryRefreshSession = async (token) => {
    const response = await refreshSession(token);
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
      if (!sessionToken) {
        console.log("no session found");
        setLoggedInUser(null);
        setIsLoggedIn(false);
        setIsAppLoaded(true);
        return;
      }
      try {
        await tryGetUser(sessionToken);
      } catch (e) {
        try {
          const refreshToken = await tryRefreshSession(sessionToken);
          await tryGetUser(refreshToken);
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
            <Route path="/otp" element={<OTP />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/update-profile" element={<ProtectedRoute component={UpdateProfile} />} />
            <Route path="/moderate-user/:username" element={<ProtectedRoute role="moderator" component={ModerateUser} />} />
            <Route path="/moderate-post/:uuid" element={<ProtectedRoute role="moderator" component={ModerateUser} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
