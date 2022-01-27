import { Button, Divider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../actions/post';
import { createReply, getReplies } from '../actions/reply';
import Container from '../components/Container';
import Reply from '../components/Reply';
import TextInput from '../components/TextInput';
import logo from '../logo.svg';
import { default as PostComponent } from '../components/Post';
import Context from '../utils/Context';

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
    })()
  }, []);

  if (!post) {
    return <img src={logo} className="App-logo" alt="logo" />;
  }

  const trySubmit = async (event) => {
    event.preventDefault();
    const response = await createReply(sessionToken, params.uuid, loggedInUser.uuid, reply);
    if (response.status === 201) {
      setReply("");
      await loadReplies();
    }
  };

  return (
    <Container title={`Read ${post.user.name}'s Post`}>
      <PostComponent post={post} onDelete={() => navigate("/")} />
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
