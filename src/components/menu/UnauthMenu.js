import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import LoginIcon from '@mui/icons-material/Login';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UnauthMenu({ showLabel }) {
  const navigate = useNavigate();

  return (
    <div>
      <ListItem button onClick={() => navigate("/login")}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary={showLabel ? "Login" : ""} />
      </ListItem>
      <ListItem button onClick={() => navigate("/signup")}>
        <ListItemIcon>
          <FollowTheSignsIcon />
        </ListItemIcon>
        <ListItemText primary={showLabel ? "Signup" : ""} />
      </ListItem>
    </div>
  );
}
