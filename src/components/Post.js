import {
  Button, Card,
  CardActions,
  CardContent,
  Link,
  Typography
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Post({post: {uuid, text}, user}) {
  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{minWidth: 300, maxWidth: 680, marginBottom: "10px"}} key={uuid}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          <Link href={`/user/${user.uuid}`}>{user.name ? user.name : "(no name)"}</Link>
        </Typography>
        <Typography>
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/post/${uuid}`)}
          variant="outlined"
        >
          Link
        </Button>
      </CardActions>
    </Card>
  );
}
