import { useContext } from 'react';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import Context from '../Context';

export default function Profile() {
  const { loggedInUser } = useContext(Context);

  return (
    <Container>
      <h1>Profile</h1>
      { loggedInUser ? (
        <p>Name: {loggedInUser.name}</p>
      ) : (
        <CircularIndeterminate />
      )}
    </Container>
  );
}
