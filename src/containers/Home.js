import { Button, IconButton } from '@mui/material';
import { post } from '@tkrotoff/fetch';
import React, {
  useContext,
  useEffect, useRef,
  useState
} from 'react';
import { createPost, getPosts as requestGetPosts } from '../actions/post';
import Container from '../components/Container';
import Post from '../components/Post';
import TextInput from '../components/TextInput';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { baseUrl, imageBaseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function Home() {
  const { sessionToken, loggedInUser, isAppLoaded, posts, setPosts } = useContext(Context);
  const [newPost, setNewPost] = useState('');
  const [imagesToPost, setImagesToPost] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const ref = useRef();

  const getPosts = async (token) => {
    const response = await requestGetPosts(token);
    const data = await response.json();
    setPosts(data ?? []);
  };

  useEffect(() => {
    if (isAppLoaded) {
      getPosts(sessionToken);
    }
  }, [isAppLoaded]);

  const trySubmitNewPost = async (event) => {
    event.preventDefault();
    const response = await createPost(sessionToken, loggedInUser.uuid, newPost, imagesToPost);
    if (response.status === 201) {
      setNewPost('');
      setImagesToPost([]);
      await getPosts(sessionToken);
    }
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p !== post));
  };

  const tryUploadNewPic = async (pic) => {
    let formData = new FormData();
    formData.append("image", pic);
    const config = {
      headers: {
        "x-session-token": sessionToken,
      },
    };
    const response = await post(`${baseUrl}/album/livestream`, formData, config);
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

  return (
    <Container title={"Home"}>
      { loggedInUser && (
        <form
          onSubmit={trySubmitNewPost}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        >
          <div>
            {imagesToPost.map((img) => (
              <img src={`${imageBaseUrl}/${img.s3_key}`} alt="image to upload" style={{width: 300}} />
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
      )}
      {posts.map((post) => (
        <Post
          post={post}
          key={post.uuid}
          onDelete={() => removePost(post)}
          showReply
        />
      ))}
    </Container>
  );
}
