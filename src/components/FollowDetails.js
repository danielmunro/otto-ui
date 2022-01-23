export default function FollowDetails({follows, followers}) {
  return (
    <p>
      {follows.length} following, {followers.length} follower{followers.length === 1 ? '' : 's'}
    </p>
  )
}
