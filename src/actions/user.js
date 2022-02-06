import { get, postJSON, putJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function signUp(username, email, password) {
  return postJSON(`${baseUrl}/user`, { username, email, password });
}

export function getUserByUsername(username) {
  return get(`${baseUrl}/user/${username}`)
}

export function updateUser(sessionToken, uuid, name, birthday, bio) {
  return putJSON(`${baseUrl}/user`, {
    name,
    birthday,
    bio_message: bio,
    uuid: uuid,
  }, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}
