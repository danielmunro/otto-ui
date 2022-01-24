import { Link } from 'react-router-dom';

export default function FollowDetails({userUuid, follows, followers}) {
  return (
    <p>
      <Link to={`/user/${userUuid}/following`}>{follows.length} following</Link>, <Link to={`/user/${userUuid}/followers`}>{followers.length} follower{followers.length === 1 ? '' : 's'}</Link>
    </p>
  )
}
