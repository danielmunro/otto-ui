import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';

export default function FollowDetails({username, follows, followers}) {
  return (
    <Typography variant="subtitle1">
      <Link component={RouterLink} to={`/u/${username}/following`}>{follows.length} following</Link>, <Link component={RouterLink} to={`/u/${username}/followers`}>{followers.length} follower{followers.length === 1 ? '' : 's'}</Link>
    </Typography>
  )
}
