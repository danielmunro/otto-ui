import { get, postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function getInvites(offset) {
  return get(`${baseUrl}/invite?offset=${offset}`);
}

export function createInvite(sessionToken) {
  return postJSON(`${baseUrl}/invite`, {}, {
    headers: {
      'x-session-token': sessionToken,
    }
  });
}
