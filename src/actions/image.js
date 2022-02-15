import { get, post } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function getImage(uuid) {
  return get(`${baseUrl}/image/${uuid}`);
}

export function getImagesForAlbum(uuid) {
  return get(`${baseUrl}/album/${uuid}/image`);
}

export function createImage(sessionToken, uuid, image) {
  let formData = new FormData();
  formData.append("image", image);
  return post(`${baseUrl}/album/${uuid}/image`, formData, {
    headers: {
      "x-session-token": sessionToken,
    },
  });
}

export function createLivestreamImage(sessionToken, image) {
  let formData = new FormData();
  formData.append("image", image);
  return post(`${baseUrl}/album/livestream`, formData, {
    headers: {
      "x-session-token": sessionToken,
    },
  });
}
