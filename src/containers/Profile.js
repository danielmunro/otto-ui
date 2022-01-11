import Link from '@mui/material/Link';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import Context from '../utils/Context';

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
      <Link href="#" onClick={tryLogout}>Logout</Link>
      <h2>Profile</h2>
      <Link href="/update-profile">update</Link>
      { loggedInUser ? (
        <p>Name: {loggedInUser.name}</p>
      ) : (
        <CircularIndeterminate />
      )}
    </Container>
  );
}
