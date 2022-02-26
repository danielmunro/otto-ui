import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../utils/Context';

export default function AuthMenu() {
  const {
    loggedInUser,
    setLoggedInUser,
    setIsLoggedIn,
    setSessionToken,
  } = useContext(Context);

  const tryLogout = (event) => {
    event.preventDefault();
    setSessionToken(null);
    setLoggedInUser(null);
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  const navigate = useNavigate();

  return (
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
  );
}
