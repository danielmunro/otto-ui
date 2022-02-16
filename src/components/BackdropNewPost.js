import { Backdrop } from '@mui/material';
import { useContext } from 'react';
import Context from '../utils/Context';
import NewPost from './NewPost';

export default function BackdropNewPost({ open, onPostCreated, closeBackdrop }) {
  const { loggedInUser } = useContext(Context);

  return (
    <Backdrop
      open={open}
      onClick={closeBackdrop}
      style={{
        zIndex: 1,
      }}
    >
      { loggedInUser && (
        <div
          onClick={(event) => event.stopPropagation() }
          style={{
            backgroundColor: "white",
            position: "relative",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <NewPost expanded onPostCreated={onPostCreated} />
        </div>
      )}
    </Backdrop>
  );
}
