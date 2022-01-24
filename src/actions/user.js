import { get, postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function signUp(username, email, password) {
  return postJSON(`${baseUrl}/user`, { username, email, password });
}

export function getUser(userUuid) {
  return get(`${baseUrl}/user/${userUuid}`);
}
