import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAlbum } from '../actions/album';
import { getImagesForAlbum } from '../actions/image';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import { imageBaseUrl } from '../utils/config';

export default function Album() {
  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const params = useParams();

  const reloadAlbum = async () => {
    const response = await getAlbum(params.uuid);
    const data = await response.json();
    setAlbum(data);
    return data;
  };

  const reloadImages = async (albumUuid) => {
    const response = await getImagesForAlbum(albumUuid);
    const data = await response.json();
    setImages(data);
  };

  useEffect(() => {
    (async function () {
      const albumData = await reloadAlbum();
      await reloadImages(albumData.uuid);
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
      {images.map((image) => (
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
