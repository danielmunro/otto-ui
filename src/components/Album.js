import { Link } from 'react-router-dom';

export default function Album({album: {name, uuid}}) {
  return (
    <div>
      <Link to={`/a/${uuid}`}>{name}</Link>
    </div>
  );
}
