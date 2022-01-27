import { get, postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function getReplies(sessionToken, postUuid) {
  return get(`${baseUrl}/post/${postUuid}/replies`, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}

export function createReply(sessionToken, postUuid, userUuid, text) {
  return postJSON(`${baseUrl}/reply`, {
    post: {
      uuid: postUuid,
    },
    user: {
      uuid: userUuid,
    },
    text,
  }, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}
