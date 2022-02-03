import { del, post } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function createPostLike(sessionToken, uuid) {
  return post(`${baseUrl}/post/${uuid}/like`, "", {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}

export function deletePostLike(sessionToken, uuid) {
  return del(`${baseUrl}/post/${uuid}/like`, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}
