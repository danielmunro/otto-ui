import { del, postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function createFollow(sessionToken, userUuid, followingUuid) {
  return postJSON(`${baseUrl}/user/${userUuid}/follows`, {
    following: {
      uuid: followingUuid,
    },
  }, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}

export function deleteFollow(sessionToken, followUuid) {
  return del(`${baseUrl}/follow/${followUuid}`, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}