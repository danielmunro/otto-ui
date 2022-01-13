import { AccountBox } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { appName } from '../utils/config';
import Context from '../utils/Context';
import Menu from './Menu';

export default function Header() {
  const { loggedInUser } = useContext(Context);

  return (
    <div className="App-header">
      <h1>{appName}</h1>
      <div className="navigation">
        { loggedInUser ? (
          <Menu />
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  )
}
