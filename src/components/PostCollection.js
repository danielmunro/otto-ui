import React, { useState } from 'react';
import BackdropNewPost from '../pages/home/components/BackdropNewPost';
import Post from './Post';

export default function PostCollection({ posts, reloadPosts, onDelete, onUnlike }) {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [postToShare, setPostToShare] = useState(null);

  const sharePostClicked = (post) => {
    setShowBackdrop(true);
    setPostToShare(post);
  };

  const closeBackdropAndReloadPosts = () => {
    setShowBackdrop(false);
    reloadPosts();
  };

  return (
    <div>
      <BackdropNewPost
        open={showBackdrop}
        onPostCreated={closeBackdropAndReloadPosts}
        closeBackdrop={() => setShowBackdrop(false)}
        post={postToShare}
      />
      {posts.map((post) => (
        <Post
          post={post}
          key={post.uuid}
          onDelete={() => onDelete(post)}
          onUnlike={() => onUnlike(post)}
          showReply
          sharePostClick={() => sharePostClicked(post)}
          compact={true}
        />
      ))}
    </div>
  );
}
