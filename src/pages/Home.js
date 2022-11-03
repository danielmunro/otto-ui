import React, {
  useContext,
  useEffect,
} from 'react';
import { getPosts as requestGetPosts } from '../actions/post';
import Container from '../components/Container';
import NewPost from '../components/NewPost';
import PostCollection from '../components/PostCollection';
import Context from '../utils/Context';

export default function Home() {
  const {
    sessionToken,
    loggedInUser,
    isLoggedIn,
    posts,
    setPosts,
  } = useContext(Context);

  const getPosts = async () => {
    const response = await requestGetPosts(sessionToken);
    const data = await response.json();
    setPosts(data ?? []);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getPosts();
    }
  }, [isLoggedIn]);

  const removePost = (post) => {
    setPosts(posts.filter((p) => p !== post));
  };

  const newPostCreated = () => {
    getPosts();
  }

  return (
    <Container title={"Home"}>
      { loggedInUser && (
        <NewPost onPostCreated={newPostCreated} />
      )}
      <PostCollection
        posts={posts}
        reloadPosts={getPosts}
        onDelete={removePost}
      />
    </Container>
  );
}
