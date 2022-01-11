import { AccountBox } from '@mui/icons-material';
import Link from '@mui/material/Link';
import { useContext } from 'react';
import Context from '../utils/Context';

export default function Header() {
  const { isAppLoaded, loggedInUser } = useContext(Context);

  if (!isAppLoaded) {
    return <span />;
  }

  return (
    <div className="App-header">
      <h1>Hello World</h1>
      <div className="navigation">
        { loggedInUser ? (
          <Link href="/profile">
            <AccountBox />
          </Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </div>
  )
}
