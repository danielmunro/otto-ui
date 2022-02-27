import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLikedPostsForUser } from '../actions/post';
import PostCollection from '../components/PostCollection';

export default function Likes() {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const { username } = params;

  const reloadPosts = async () => {
    console.log("RELOAD");
    const response = await getLikedPostsForUser(username);
    const data = await response.json();
    setPosts(data);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.uuid !== post.uuid));
  };

  useEffect(() => {
    (async function () {
      await reloadPosts();
    })();
  }, []);

  console.log("liked posts", posts);

  return (
    <PostCollection
      posts={posts}
      reloadPosts={reloadPosts}
      onDelete={removePost}
    />
  );
}
