import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import HomeLink from '../components/HomeLink';
import Context from '../utils/Context';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function Profile() {
  const { loggedInUser, setLoggedInUser, setSessionToken } = useContext(Context);
  const navigate = useNavigate();

  const tryLogout = (event) => {
    event.preventDefault();
    setSessionToken(null);
    setLoggedInUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container>
      <p>
        <HomeLink />
      </p>
      <p>
        <Link to="#" onClick={tryLogout}>
          <LogoutIcon />  Logout
        </Link>
      </p>
      <p>
        <Link to="/update-profile">
          <ManageAccountsIcon /> Update profile
        </Link>
      </p>
      { loggedInUser ? (
        <div>
          <h2>{loggedInUser.name}</h2>
          <p>{loggedInUser.bio_message}</p>
        </div>
      ) : (
        <CircularIndeterminate />
      )}
    </Container>
  );
}
