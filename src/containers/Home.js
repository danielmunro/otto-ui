import React, {
  useContext,
  useEffect,
} from 'react';
import { getPosts as requestGetPosts } from '../actions/post';
import Container from '../components/Container';
import NewPost from '../components/NewPost';
import Post from '../components/Post';
import Context from '../utils/Context';

export default function Home() {
  const { sessionToken, loggedInUser, isAppLoaded, posts, setPosts } = useContext(Context);

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

  return (
    <Container title={"Home"}>
      { loggedInUser && (
        <NewPost onPostCreated={getPosts} />
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
