import { del, get, patchJSON, postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function getUser(sessionToken) {
  return get(`${baseUrl}/session?token=${sessionToken}`);
}

export function login(email, password) {
  return postJSON(`${baseUrl}/session`, { email, password });
}

export function refreshSession(sessionToken) {
  return patchJSON(`${baseUrl}/session`, { sessionToken });
}

export function deleteSession(token) {
  return del(`${baseUrl}/session?token=${token}`);
}
