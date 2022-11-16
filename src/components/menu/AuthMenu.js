import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteSession } from '../../actions/session';
import Context from '../../utils/Context';

export default function AuthMenu({ showLabel }) {
  const {
    loggedInUser,
    setLoggedInUser,
    setIsLoggedIn,
    sessionToken,
    setSessionToken,
    setPosts,
    notifications,
  } = useContext(Context);
  const navigate = useNavigate();

  const tryLogout = async (event) => {
    event.preventDefault();
    setSessionToken(null);
    setLoggedInUser(null);
    setIsLoggedIn(false);
    setPosts([]);
    await deleteSession(sessionToken);
    localStorage.setItem("token", null);
    navigate("/");
  };

  if (!loggedInUser) {
    return <div />;
  }

  return (
    <div>
      <ListItem button onClick={() => navigate(`/notifications`)}>
        <ListItemIcon>
          <Badge badgeContent={notifications.filter((n) => !n.seen).length} color="primary">
            <NotificationsIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary={showLabel ? "Notifications" : ""} />
      </ListItem>
      <ListItem button onClick={() => navigate(`/u/${loggedInUser.username}`)}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary={showLabel ? "Profile" : ""} />
      </ListItem>
      <ListItem button onClick={() => navigate(`/update-profile`)}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={showLabel ? "Update Profile" : ""} />
      </ListItem>
      <ListItem button onClick={() => navigate(`/drafts`)}>
        <ListItemIcon>
          <NoteAltIcon />
        </ListItemIcon>
        <ListItemText primary={showLabel ? "Drafts" : ""} />
      </ListItem>
      <ListItem button onClick={tryLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={showLabel ? "Logout" : ""} />
      </ListItem>
    </div>
  );
}
