import { Avatar, Button } from '@mui/material';
import { get, post, putJSON } from '@tkrotoff/fetch';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [imageToUpload, setImageToUpload] = useState('');
  const { loggedInUser, setLoggedInUser, sessionToken } = useContext(Context);
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

  const tryUploadNewPic = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("filename", imageToUpload);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-session-token": sessionToken,
      },
    };
    post(`${baseUrl}/user/${loggedInUser.uuid}/image`, formData, config);
    // post(url, formData, config)
    //   .then(function(response) {
    //     console.log("FILE UPLOADED SUCCESSFULLY");
    //   })
    //   .catch(function(error) {
    //     console.log("ERROR WHILE UPLOADING FILE");
    //   });
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
      <Avatar
        alt={loggedInUser.name}
        src={loggedInUser.profile_pic}
        style={{ float: "left", marginRight: 10, width: 48, height: 48 }}
      />
      <h2>Update Profile</h2>
      <form onSubmit={tryUploadNewPic}>
        <input
          type="file"
          onChange={(event) => setImageToUpload(event.target.value)}
        />
        <Button type="submit">Upload New Profile Pic</Button>
      </form>
      <form onSubmit={tryUpdateProfile}>
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
