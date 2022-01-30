import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAlbum } from '../actions/album';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import { imageBaseUrl } from '../utils/config';

export default function Album() {
  const [album, setAlbum] = useState(null);
  const params = useParams();

  useEffect(() => {
    (async function () {
      const response = await getAlbum(params.uuid);
      const data = await response.json();
      setAlbum(data);
    })();
  }, []);

  if (!album) {
    return (
      <Container>
        <CircularIndeterminate />
      </Container>
    );
  }

  return (
    <Container title={album.name}>
      {album.images.map((image) => (
        <Link to={`/i/${image.uuid}`} key={image.uuid}>
          <img
            src={`${imageBaseUrl}/${image.s3_key}`}
            alt={`Created at ${image.created_at}`}
            className="post-gallery"
          />
        </Link>
      ))}
    </Container>
  );
}
