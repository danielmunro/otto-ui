import { del, postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function login(email, password) {
  return postJSON(`${baseUrl}/session`, { email, password });
}

export function deleteSession(token) {
  return del(`${baseUrl}/session?token=${token}`);
}
