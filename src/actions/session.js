import { postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../config';

export function login(email, password) {
  return postJSON(`${baseUrl}/session`, { email, password });
}
