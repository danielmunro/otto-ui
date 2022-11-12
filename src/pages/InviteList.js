import { Box, Button } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useContext, useEffect, useState } from 'react';
import { createInvite, getInvites } from '../actions/invite';
import Container from '../components/Container';
import Context from '../utils/Context';

export default function InviteList() {
  const [invites, setInvites] = useState([]);
  const { sessionToken } = useContext(Context);

  useEffect(() => {
    (async function() {
      const response = await getInvites(0);
      const data = await response.json();
      setInvites(data);
    })();
  }, []);

  const createNewInvite = async () => {
    const response = await createInvite(sessionToken);
    const data = await response.json();
    const allInvites = [data].concat(invites);
    setInvites(allInvites);
  };

  const copyToClipboard = (code) => navigator.clipboard.writeText(`https://thirdplaceapp.com/signup?invite=${code}`);

  return (
    <Container title="Invitations">
      <Button onClick={createNewInvite}>
        Create New Invite
      </Button>
      {invites.map((invite) => (
        <Box key={invite.code} sx={{ display: 'flex', p: 1 }}>
          <div style={{ width: "40%" }}>
            {invite.code}
          </div>
          { invite.claimed && (
            <div style={{ width: "20%" }}>
              Claimed
            </div>
          )}
          { !invite.claimed && (
            <Button onClick={() => copyToClipboard(invite.code)}>
              <ContentPasteIcon />
            </Button>
          )}
        </Box>
      ))}
    </Container>
  );
}
