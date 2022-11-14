import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {Editor, EditorState} from 'draft-js';
import React, { useContext, useRef, useState } from 'react';
import { createLivestreamImage } from '../../../actions/image';
import { createPost, createShare } from '../../../actions/post';
import Context from '../../../utils/Context';
import ImageToUpload from './ImageToUpload';

export default function NewPost({ onPostCreated, images, post }) {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createWithText(
      localStorage.getItem("newPost") || ""
    ),
  );
  const [imagesToPost, setImagesToPost] = useState(images || []);
  const [draft, setDraft] = useState(false);
  const { sessionToken, loggedInUser } = useContext(Context);
  const imageRef = useRef();
  const theme = useTheme();

  const tryUploadNewPic = async (pic) => {
    const response = await createLivestreamImage(sessionToken, pic);
    const data = await response.json();
    const currentImages = [...imagesToPost];
    currentImages.push(data);
    setImagesToPost(currentImages);
    imageRef.current.value = "";
  };

  const showFileSelector = (event) => {
    event.preventDefault();
    imageRef.current.click();
  };

  const trySubmitNewPost = async (event) => {
    event.preventDefault();
    const response = post ?
      await createShare(
        sessionToken,
        loggedInUser.uuid,
        editorState.getCurrentContent().getPlainText(),
        imagesToPost,
        post.uuid
      ) :
      await createPost(
        sessionToken,
        loggedInUser.uuid,
        editorState.getCurrentContent().getPlainText(),
        draft,
        imagesToPost
      );
    if (response.status === 200 || response.status === 201) {
      onChangeNewPost(EditorState.createEmpty());
      setDraft(false);
      setImagesToPost([]);
      onPostCreated();
    }
  };

  const onChangeNewPost = (value) => {
    localStorage.setItem("newPost", value.getCurrentContent().getPlainText());
    setEditorState(value);
  };

  const tryRemoveImage = (image) => {
    const newImages = imagesToPost.filter((i) => i.uuid !== image.uuid);
    setImagesToPost(newImages);
  };

  return (
    <form
      onSubmit={trySubmitNewPost}
    >
      <div style={{display: "flex"}}>
        {imagesToPost.map((img) => (
          <ImageToUpload image={img} onRemove={() => tryRemoveImage(img)} />
        ))}
      </div>
      <div style={{borderBottom: `1px solid ${theme.palette.background.paper}`}}>
        <Editor
          placeholder={"What are you thinking about?"}
          spellCheck={true}
          editorState={editorState}
          onChange={onChangeNewPost}
        />
      </div>
      <input
        type="file"
        ref={imageRef}
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
      <FormControlLabel
        style={{padding: "10px 0 0 10px"}}
        control={<Checkbox />}
        checked={draft}
        onChange={() => setDraft(!draft) }
        label={"Save as draft"}
      />
      <p>
        <IconButton aria-label="upload an image" onClick={showFileSelector}>
          <AddPhotoAlternateIcon />
        </IconButton>
      </p>
    </form>
  );
}
