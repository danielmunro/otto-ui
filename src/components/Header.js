import { AccountBox } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../utils/Context';

export default function Header() {
  const { loggedInUser } = useContext(Context);

  return (
    <div className="App-header">
      <h1>Hello World</h1>
      <div className="navigation">
        { loggedInUser ? (
          <Link to="/profile">
            <AccountBox />
            <span>My Profile</span>
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  )
}
