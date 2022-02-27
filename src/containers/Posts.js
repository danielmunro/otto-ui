import React, { useContext, useEffect, useState } from 'react';
import { getPostsForUser } from '../actions/post';
import PostCollection from '../components/PostCollection';
import Context from '../utils/Context';

export default function Posts({ username }) {
  const [posts, setPosts] = useState([]);
  const { sessionToken } = useContext(Context);

  const reloadPosts = async () => {
    const response = await getPostsForUser(sessionToken, username);
    const data = await response.json();
    setPosts(data);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.uuid !== post.uuid));
  };

  useEffect(() => {
    (async function() {
      await reloadPosts();
    })();
  }, [username]);

  return (
    <PostCollection
      posts={posts}
      reloadPosts={reloadPosts}
      onDelete={removePost}
    />
  );
}
