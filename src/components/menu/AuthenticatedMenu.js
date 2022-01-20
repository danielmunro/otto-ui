import {
  Button,
  MenuItem,
  Menu as MUIMenu,
  ListItemIcon,
  ListItemText, Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import Context from '../../utils/Context';

export default function AuthenticatedMenu() {
  const { setLoggedInUser, setSessionToken, setIsLoggedIn } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const tryLogout = (event) => {
    event.preventDefault();
    setSessionToken(null);
    setLoggedInUser(null);
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <MUIMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/update-profile")}>
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Update Profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={tryLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </MUIMenu>
    </div>
  );
}
