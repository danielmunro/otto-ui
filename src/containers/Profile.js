import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import Context from '../utils/Context';

export default function Profile() {
  const { loggedInUser } = useContext(Context);

  return (
    <Container>
      { loggedInUser ? (
        <div>
          <Avatar
            alt={loggedInUser.name}
            src={loggedInUser.profile_pic}
            style={{ float: "left", marginRight: 10, width: 48, height: 48 }}
          />
          <h2>{loggedInUser.name}</h2>
          <p>{loggedInUser.bio_message}</p>
          <p>
            <Link to={`/user/${loggedInUser.uuid}`}>
              Public Link
            </Link>
          </p>
        </div>
      ) : (
        <CircularIndeterminate />
      )}
    </Container>
  );
}
