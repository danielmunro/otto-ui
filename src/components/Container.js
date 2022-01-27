import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../utils/Context';

const drawerWidth = 240;

export default function Container({ children, title }) {
  const { isLoggedIn, setIsLoggedIn, setSessionToken, setLoggedInUser, loggedInUser } = useContext(Context);
  const navigate = useNavigate();

  const tryLogout = (event) => {
    event.preventDefault();
    setSessionToken(null);
    setLoggedInUser(null);
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: "#011627" }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          { isLoggedIn ? (
            <div>
              <ListItem button onClick={() => navigate(`/u/${loggedInUser.username}`)}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItem>
              <ListItem button onClick={() => navigate(`/update-profile`)}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary={"Update Profile"} />
              </ListItem>
              <ListItem button onClick={tryLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItem>
            </div>
          ) : (
            <div>
              <ListItem button onClick={() => navigate("/login")}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItem>
              <ListItem button onClick={() => navigate("/signup")}>
                <ListItemIcon>
                  <FollowTheSignsIcon />
                </ListItemIcon>
                <ListItemText primary={"Signup"} />
              </ListItem>
            </div>
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ bgcolor: 'background.default', p: 3, width: 800 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
