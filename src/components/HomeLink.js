import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export default function HomeLink() {
  return (
    <Link to="/">
      <HomeIcon /> Home
    </Link>
  );
}
