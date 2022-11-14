import { Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getDraftPosts } from '../actions/post';
import Container from '../components/Container';
import PostCollection from '../components/PostCollection';
import Context from '../utils/Context';

export default function Drafts() {
  const [drafts, setDrafts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { sessionToken } = useContext(Context);

  const reloadDrafts = async () => {
    const response = getDraftPosts(sessionToken);
    const data = await response.json();
    setDrafts(data);
    setLoaded(true);
  };

  const removeDraft = (draft) => {
    setDrafts(drafts.filter((p) => p.uuid !== draft.uuid));
  };

  useEffect(() => {
    reloadDrafts();
  }, []);

  return (
    <Container title="Drafts">
      { loaded && drafts.length === 0 && (
        <Paper sx={{ p: 1 }}>
          You have no drafts!
        </Paper>
      )}
      <PostCollection
        posts={drafts}
        reloadPosts={reloadDrafts}
        onDelete={removeDraft}
      />
    </Container>
  );
}
