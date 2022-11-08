import { get, postJSON, putJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function signUp(username, email, password, inviteCode) {
  return fetch(
    `${baseUrl}/user`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        invite_code: inviteCode,
      })
    },
  );
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

export function submitOtp(username, code) {
  return postJSON(`${baseUrl}/otp`, {
    user: { username },
    code,
  });
}
