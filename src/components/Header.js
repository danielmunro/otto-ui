import Link from '@mui/material/Link';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../utils/Context';

export default function Header() {
  const { isAppLoaded, loggedInUser, setSessionToken, setLoggedInUser } = useContext(Context);
  const navigate = useNavigate();

  if (!isAppLoaded) {
    return <span />;
  }

  const logout = (event) => {
    event.preventDefault();
    setSessionToken(null);
    setLoggedInUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="App-header">
      <h1>Hello World</h1>
      <div className="navigation">
        { loggedInUser ? (
          <Link href="#" onClick={logout}>Logout</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </div>
  )
}
