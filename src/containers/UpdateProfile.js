import { Button } from '@mui/material';
import { get, putJSON } from '@tkrotoff/fetch';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import { baseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function UpdateProfile() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [bio, setBio] = useState('');
  const { loggedInUser, setLoggedInUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      (async function () {
        const response = await get(`${baseUrl}/user/${loggedInUser.uuid}`);
        const data = await response.json();
        setName(data.name);
        setBirthday(data.birthday);
        setBio(data.bio_message);
        setIsLoaded(true);
      })();
    }
  }, [loggedInUser]);

  const tryUpdateProfile = async (event) => {
    event.preventDefault();
    await putJSON(`${baseUrl}/user`, {
      name,
      birthday,
      bio_message: bio,
      uuid: loggedInUser.uuid,
    });
    const update = {...loggedInUser};
    update.name = name;
    update.birthday = birthday;
    update.bio_message = bio;
    setLoggedInUser(update);
    navigate("/profile");
  };

  if (!isLoaded) {
    return (
      <Container>
        <CircularIndeterminate />
      </Container>
    );
  }

  return (
    <Container>
      <h2>Update Profile</h2>
      <form onSubmit={tryUpdateProfile}>
        <div>
          <TextInput
            label="Name"
            value={name}
            onChangeValue={setName}
          />
        </div>
        <div>
          <TextInput
            label="Birthday"
            value={birthday}
            onChangeValue={setBirthday}
          />
        </div>
        <div>
          <TextInput
            label="Public Message"
            value={bio}
            onChangeValue={setBio}
            multiline
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate("/profile");
            }}
            style={{
              marginLeft: 10,
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
}
