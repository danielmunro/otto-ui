import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { getPosts as requestGetPosts } from '../actions/post';
import BackdropNewPost from '../components/BackdropNewPost';
import Container from '../components/Container';
import NewPost from '../components/NewPost';
import Post from '../components/Post';
import Context from '../utils/Context';

export default function Home() {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [postToShare, setPostToShare] = useState(null);
  const {
    sessionToken,
    loggedInUser,
    isAppLoaded,
    posts,
    setPosts,
  } = useContext(Context);

  const getPosts = async () => {
    const response = await requestGetPosts(sessionToken);
    const data = await response.json();
    setPosts(data ?? []);
  };

  useEffect(() => {
    if (isAppLoaded) {
      getPosts();
    }
  }, [isAppLoaded]);

  const removePost = (post) => {
    setPosts(posts.filter((p) => p !== post));
  };

  const newPostCreated = () => {
    setShowBackdrop(false);
    getPosts();
  }

  const sharePostClicked = (post) => {
    setShowBackdrop(true);
    setPostToShare(post);
  };

  return (
    <Container title={"Home"}>
      <BackdropNewPost
        open={showBackdrop}
        onPostCreated={getPosts}
        closeBackdrop={() => setShowBackdrop(false)}
        post={postToShare}
      />
      { loggedInUser && (
        <NewPost onPostCreated={newPostCreated} />
      )}
      {posts.map((post) => (
        <Post
          post={post}
          key={post.uuid}
          onDelete={() => removePost(post)}
          showReply
          sharePostClick={() => sharePostClicked(post)}
        />
      ))}
    </Container>
  );
}
