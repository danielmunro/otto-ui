import { postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../config';

export function createPost(sessionToken, userUuid, newPostText) {
  return postJSON(`${baseUrl}/post`, {
    user: {uuid: userUuid},
    text:  newPostText,
  }, {
    headers: {
      'x-session-token': sessionToken,
    }
  })
}
