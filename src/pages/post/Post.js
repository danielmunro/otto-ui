import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { getPost } from '../../actions/post';
import { createReply, getReplies } from '../../actions/reply';
import Container from '../../components/Container';
import { imageBaseUrl } from '../../utils/config';
import Reply from './components/Reply';
import TextInput from '../../components/TextInput';
import { default as PostComponent } from '../../components/Post';
import Context from '../../utils/Context';

export default function Post() {
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState('');
  const { posts, sessionToken, loggedInUser, isLoggedIn } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const loadPost = async () => {
    const response = await getPost(sessionToken, params.uuid);
    const data = await response.json();
    setPost(data);
  };

  const loadReplies = async () => {
    const response = await getReplies(sessionToken, params.uuid);
    const data = await response.json();
    setReplies(data);
  };

  useEffect(() => {
    for (const p of posts) {
      if (p.uuid === params.uuid) {
        setPost(p);
        loadReplies();
        return;
      }
    }
    (async function() {
      await loadPost();
      await loadReplies();
    })();
  }, []);

  if (!post) {
    return <Container />;
  }

  const trySubmit = async (event) => {
    event.preventDefault();
    const response = await createReply(sessionToken, params.uuid, loggedInUser.uuid, reply);
    if (response.status === 201) {
      setReply("");
      await loadReplies();
    }
  };

  const title = `Read ${post.user.name || '@'+post.user.username}'s Post`;
  const description = post.text.split(".")[0];

  return (
    <Container>
      <MetaTags>
        <title>{title}</title>
        <meta
          property="og:title"
          content={title}
        />
        <meta
          property="og:url"
          content={`https://thirdplaceapp.com/p/${post.uuid}`}
        />
        { post.images && post.images.length > 0 && (
          <meta
            property="og:image"
            content={`${imageBaseUrl}/${post.images[0].s3_key}`}
          />
        )}
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Third Place" />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.created_at} />
      </MetaTags>
      <PostComponent post={post} onDelete={() => navigate("/")} showReply={false} />
      <h3>Replies</h3>
      { isLoggedIn && (
        <form onSubmit={trySubmit} style={{paddingBottom: 20}}>
          <TextInput
            label="Share your reply"
            variant="standard"
            onChangeValue={setReply}
            value={reply}
            multiline
            style={{width: 500}}
          />
          <Button type="submit">
            Reply
          </Button>
        </form>
      )}
      {replies.map((r) => (
        <Reply key={r.uuid} reply={r} />
      ))}
    </Container>
  )
}
