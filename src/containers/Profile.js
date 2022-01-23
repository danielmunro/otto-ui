import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import FollowDetails from '../components/FollowDetails';
import { imageBaseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function Profile() {
  const { loggedInUser, follows, followers } = useContext(Context);

  const profilePic = loggedInUser && loggedInUser.profile_pic ? `${imageBaseUrl}/${loggedInUser.profile_pic}` : '';

  return (
    <Container>
      { loggedInUser ? (
        <div>
          <Avatar
            alt={loggedInUser.name}
            src={profilePic}
            style={{ float: "left", marginRight: 10, width: 48, height: 48 }}
          />
          <h2>{loggedInUser.name}</h2>
          <FollowDetails follows={follows} followers={followers} />
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
