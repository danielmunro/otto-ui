import { Avatar, Button, Divider } from '@mui/material';
import { post, putJSON } from '@tkrotoff/fetch';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByUsername } from '../actions/user';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import { baseUrl, imageBaseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function UpdateProfile() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [bio, setBio] = useState('');
  const [imageToUpload, setImageToUpload] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const { loggedInUser, setLoggedInUser, sessionToken } = useContext(Context);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    if (loggedInUser) {
      (async function () {
        const response = await getUserByUsername(loggedInUser.username);
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
    navigate(`/u/${loggedInUser.username}`);
  };

  const tryUploadNewPic = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", imageToUpload);
    const config = {
      headers: {
        "x-session-token": sessionToken,
      },
    };
    const response = await post(`${baseUrl}/user/${loggedInUser.uuid}/image`, formData, config);
    const data = await response.json();
    const newUser = {...loggedInUser};
    newUser.profile_pic = data.s3_key;
    setLoggedInUser(newUser);
    ref.current.value = "";
    setShowUpload(false);
  };

  const displayUploadForm = () => {
    setShowUpload(true);
  };

  const hideUploadForm = () => {
    setShowUpload(false);
  };

  if (!isLoaded) {
    return (
      <Container>
        <CircularIndeterminate />
      </Container>
    );
  }

  const profilePic = loggedInUser.profile_pic ? `${imageBaseUrl}/${loggedInUser.profile_pic}` : '';

  return (
    <Container title={"Update Profile"}>
      <Avatar
        alt={loggedInUser.name}
        src={profilePic}
        style={{ float: "left", marginRight: 10, width: 48, height: 48 }}
      />
      <div style={{padding: 10}}>
        {showUpload ? (
          <form onSubmit={tryUploadNewPic}>
            <input
              type="file"
              ref={ref}
              onChange={(event) => setImageToUpload(event.target.files[0])}
            />
            <Button type="submit">Upload New Profile Pic</Button>
            <Button onClick={hideUploadForm} color="secondary">Cancel</Button>
          </form>
        ) : (
          <Button onClick={displayUploadForm} variant="outlined">
            Upload New Profile Picture
          </Button>
        )}
      </div>
      <Divider />
      <form style={{paddingTop: 10}} onSubmit={tryUpdateProfile}>
        <div>
          <TextInput
            label="Name"
            value={name}
            onChangeValue={setName}
            style={{width: 400}}
          />
        </div>
        <div>
          <TextInput
            label="Birthday"
            value={birthday}
            onChangeValue={setBirthday}
            style={{width: 400}}
          />
        </div>
        <div>
          <TextInput
            label="Public Message"
            value={bio}
            onChangeValue={setBio}
            multiline
            style={{width: 400}}
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
        </div>
      </form>
    </Container>
  );
}
