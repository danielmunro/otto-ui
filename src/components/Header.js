import { useContext } from 'react';
import { appName } from '../utils/config';
import Context from '../utils/Context';
import AuthenticatedMenu from './menu/AuthenticatedMenu';
import UnauthenticatedMenu from './menu/UnauthenticatedMenu';

export default function Header() {
  const { loggedInUser } = useContext(Context);

  return (
    <div className="App-header">
      <h1>{appName}</h1>
      <div className="navigation">
        { loggedInUser ? (
          <AuthenticatedMenu />
        ) : (
          <UnauthenticatedMenu />
        )}
      </div>
    </div>
  )
}
