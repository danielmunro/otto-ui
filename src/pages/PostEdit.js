import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Editor, EditorState } from 'draft-js';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, updatePost } from '../actions/post';
import Container from '../components/Container';
import Context from '../utils/Context';

export default function PostEdit() {
  const [post, setPost] = useState(null);
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  const [draft, setDraft] = useState(false);
  const { sessionToken } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const loadPost = async () => {
    const response = await getPost(sessionToken, params.uuid);
    const data = await response.json();
    setPost(data);
    setDraft(data.draft);
    setEditorState(EditorState.createWithText(data.text));
  };

  const tryUpdatePost = async (event) => {
    event.preventDefault();
    await updatePost(sessionToken, post.uuid, editorState.getCurrentContent().getPlainText(), draft);
    navigate(`/p/${post.uuid}`);
    return false;
  };

  useEffect(() => {
    (async function() {
      await loadPost();
    })();
  }, []);

  return (
    <Container>
      <form onSubmit={tryUpdatePost}>
        <div style={{borderBottom: `1px solid ${theme.palette.background.paper}`}}>
          <Editor
            placeholder={"What are you thinking about?"}
            spellCheck={true}
            editorState={editorState}
            onChange={setEditorState}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{marginLeft: 10, marginTop: 10}}
        >
          Submit
        </Button>
        <FormControlLabel
          style={{padding: "10px 0 0 10px"}}
          control={<Checkbox />}
          checked={draft}
          onChange={() => setDraft(!draft) }
          label={"Save as draft"}
        />
      </form>
    </Container>
  );
}
