import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button, IconButton } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { createLivestreamImage } from '../actions/image';
import { createPost } from '../actions/post';
import Context from '../utils/Context';
import ImageToUpload from './ImageToUpload';
import TextInput from './TextInput';

export default function NewPost({ onPostCreated, images }) {
  const [newPost, setNewPost] = useState('');
  const [imagesToPost, setImagesToPost] = useState(images || []);
  const [inputFocused, setInputFocused] = useState(false);
  const { sessionToken, loggedInUser } = useContext(Context);
  const ref = useRef();

  const tryUploadNewPic = async (pic) => {
    const response = await createLivestreamImage(sessionToken, pic);
    const data = await response.json();
    const currentImages = [...imagesToPost];
    currentImages.push(data);
    setImagesToPost(currentImages);
    ref.current.value = "";
  };

  const showFileSelector = (event) => {
    event.preventDefault();
    ref.current.click();
  };

  const trySubmitNewPost = async (event) => {
    event.preventDefault();
    const response = await createPost(sessionToken, loggedInUser.uuid, newPost, imagesToPost);
    if (response.status === 201) {
      setNewPost('');
      setImagesToPost([]);
      onPostCreated();
    }
  };

  const tryRemoveImage = (image) => {
    const newImages = imagesToPost.filter((i) => i.uuid !== image.uuid);
    setImagesToPost(newImages);
  };

  return (
    <form
      onSubmit={trySubmitNewPost}
      onFocus={() => setInputFocused(true)}
      onBlur={() => setInputFocused(false)}
    >
      <div style={{display: "flex"}}>
        {imagesToPost.map((img) => (
          <ImageToUpload image={img} onRemove={() => tryRemoveImage(img)} />
        ))}
      </div>
      <TextInput
        label="Share something"
        variant="standard"
        onChangeValue={setNewPost}
        value={newPost}
        multiline
        minRows={inputFocused ? 3 : 1}
        style={{width: 500}}
      />
      <input
        type="file"
        ref={ref}
        onChange={(event) => tryUploadNewPic(event.target.files[0])}
        style={{display: "none"}}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{marginLeft: 10, marginTop: 10}}
      >
        Submit
      </Button>
      <p>
        <IconButton aria-label="upload an image" onClick={showFileSelector}>
          <AddPhotoAlternateIcon />
        </IconButton>
      </p>
    </form>
  );
}
