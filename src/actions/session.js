import { postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function login(email, password) {
  return postJSON(`${baseUrl}/session`, { email, password });
}
