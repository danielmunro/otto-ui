import { get } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function getImage(uuid) {
  return get(`${baseUrl}/image/${uuid}`);
}

export function getImagesForAlbum(uuid) {
  return get(`${baseUrl}/album/${uuid}/image`);
}
