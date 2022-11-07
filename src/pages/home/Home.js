import { Typography } from '@mui/material';
import React, {
  useContext,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { getPosts as requestGetPosts } from '../../actions/post';
import Container from '../../components/Container';
import PaperContainer from '../../components/PaperContainer';
import NewPost from './components/NewPost';
import PostCollection from '../../components/PostCollection';
import Context from '../../utils/Context';

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

  return (
    <Container title={"Home"}>
      { !loggedInUser && (
        <PaperContainer>
          <Typography>
            Third place is an open source social network. The code that powers this site is free for anyone to download, view, and modify. We embrace open source because that is how we learned to program, and we hope others find this project useful in their learning journey.
          </Typography>
          <Typography sx={{paddingTop: 1}}>
            While Third place is in closed beta, invite codes are required for signing up.
          </Typography>
          <Typography variant="h2">
            Building Third Place
          </Typography>
          <Typography>
            <Link to="//thirdplaceapp.com/p/277ad822-c24a-4801-83ad-7cc6a68b4564">Part I</Link> introduces the project, the technology, and the code
          </Typography>
          <Typography sx={{paddingTop: 1}}>
            <Link to="//thirdplaceapp.com/p/9aed55cd-1d3b-4208-befe-4b3e3500291b">Part II</Link> covers the sign up flow for new users
          </Typography>
        </PaperContainer>
      )}
      { loggedInUser && (
        <NewPost onPostCreated={getPosts} />
      )}
      <PostCollection
        posts={posts}
        reloadPosts={getPosts}
        onDelete={removePost}
      />
    </Container>
  );
}
