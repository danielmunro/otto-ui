import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../hooks/window';
import Context from '../utils/Context';
import AuthMenu from './menu/AuthMenu';
import UnauthMenu from './menu/UnauthMenu';

export default function Container({ children, title }) {
  const [showLabel, setShowLabel] = useState(true);
  const { isLoggedIn } = useContext(Context);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    setShowLabel(width > 800);
  }, [width]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: "18%",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: "18%",
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
            <ListItemText primary={showLabel ? "Home" : ""} />
          </ListItem>
          { isLoggedIn ? (
            <AuthMenu showLabel={showLabel} />
          ) : (
            <UnauthMenu showLabel={showLabel} />
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ p: 1, width: "82%", maxWidth: 800 }}
      >
        { title && (
          <Typography variant="h1">
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
}
