import { Button } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAlbum } from '../actions/album';
import { createImage, getImagesForAlbum } from '../actions/image';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import { imageBaseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function Album() {
  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [imageToUpload, setImageToUpload] = useState("");
  const {sessionToken} = useContext(Context);
  const params = useParams();
  const ref = useRef();

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

  const tryUploadNewPic = async (event) => {
    event.preventDefault();
    const response = createImage(sessionToken, params.uuid, imageToUpload);
    const data = await response.json();
    const allImages = [...images, data];
    setImages(allImages);
    ref.current.value = "";
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
      <form onSubmit={tryUploadNewPic}>
        <input
          type="file"
          ref={ref}
          onChange={(event) => setImageToUpload(event.target.files[0])}
        />
        <Button type="submit">Add To Album</Button>
      </form>
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
