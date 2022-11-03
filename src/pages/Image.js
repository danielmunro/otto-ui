import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getImage } from '../actions/image';
import CircularIndeterminate from '../components/CircularIndeterminate';
import Container from '../components/Container';
import { imageBaseUrl } from '../utils/config';

export default function Image() {
  const [image, setImage] = useState();
  const params = useParams();

  useEffect(() => {
    (async function () {
      const response = await getImage(params.uuid);
      const data = await response.json();
      setImage(data);
    })();
  }, []);

  if (!image) {
    return (
      <Container>
        <CircularIndeterminate />
      </Container>
    );
  }

  const createdAt = new Date(image.created_at)

  return (
    <Container title={createdAt.toLocaleString()}>
      <img src={`${imageBaseUrl}/${image.s3_key}`} alt="" />
    </Container>
  );
}
