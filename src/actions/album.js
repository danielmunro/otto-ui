import { get, postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function getAlbum(uuid) {
  return get(`${baseUrl}/album/${uuid}`);
}

export function createAlbum(sessionToken, name) {
  return postJSON(`${baseUrl}/album`, { name }, {
    headers: {
      'x-session-token': sessionToken,
    }
  });
}

export function getAlbums(username) {
  return get(`${baseUrl}/user/${username}/album`);
}
