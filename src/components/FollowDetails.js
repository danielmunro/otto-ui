import { Link } from 'react-router-dom';

export default function FollowDetails({username, follows, followers}) {
  return (
    <p>
      <Link to={`/u/${username}/following`}>{follows.length} following</Link>, <Link to={`/u/${username}/followers`}>{followers.length} follower{followers.length === 1 ? '' : 's'}</Link>
    </p>
  )
}
