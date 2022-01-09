import { postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../config';

export function signUp(email, password) {
  return postJSON(`${baseUrl}/user`, { email, password });
}
