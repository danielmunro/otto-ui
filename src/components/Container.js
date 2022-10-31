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
import HomeIcon from '@mui/icons-material/Home';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../utils/Context';
import AuthMenu from './menu/AuthMenu';
import UnauthMenu from './menu/UnauthMenu';

const drawerWidth = 240;

export default function Container({ children, title }) {
  const { isLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          zIndex: 0,
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
            <AuthMenu />
          ) : (
            <UnauthMenu />
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ p: 1, width: 680 }}
      >
        {children}
      </Box>
    </Box>
  );
}
