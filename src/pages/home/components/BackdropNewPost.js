import { Backdrop } from '@mui/material';
import NewPost from './NewPost';
import Post from '../../../components/Post';

export default function BackdropNewPost({ open, onPostCreated, closeBackdrop, post }) {
  return (
    <Backdrop
      open={open}
      onClick={closeBackdrop}
      style={{
        zIndex: 1,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation() }
        style={{
          backgroundColor: "white",
          position: "relative",
          padding: 5,
          borderRadius: 5,
        }}
      >
        <NewPost post={post} onPostCreated={onPostCreated} />
        { post && (
          <Post post={post} showShare={false} />
        )}
      </div>
    </Backdrop>
  );
}
