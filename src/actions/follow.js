import { del, get, postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function createFollow(sessionToken, userUuid, followingUuid) {
  return postJSON(`${baseUrl}/follow`, {
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

export function getFollowing(userUuid) {
  return get(`${baseUrl}/follows/${userUuid}`);
}

export function getFollowers(userUuid) {
  return get(`${baseUrl}/followers/${userUuid}`);
}
