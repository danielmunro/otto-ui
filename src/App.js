import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import Home from './containers/Home';
import './App.css';
import Login from './containers/Login';
import PasswordReset from './containers/PasswordReset';
import Profile from './containers/Profile';
import Signup from './containers/Signup';
import Context from './Context';
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

  const appContext = {
    sessionToken,
    setSessionToken,
    loggedInUser,
    setLoggedInUser,
    userEmail,
    setUserEmail,
  };
  useEffect(() => {
    setSessionToken(localStorage.getItem("token"));
    setLoggedInUser(localStorage.getItem("user"));
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
