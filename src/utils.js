import { baseUrl } from './config';

export function fetchPost(data, accessToken) {
  return fetch(`${baseUrl}/session`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
    body: JSON.stringify(data),
  });
}
