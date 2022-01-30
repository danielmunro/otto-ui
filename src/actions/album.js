import { get } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function getAlbum(uuid) {
  return get(`${baseUrl}/album/${uuid}`);
}
