import { postJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function signUp(email, password) {
  return postJSON(`${baseUrl}/user`, { email, password });
}
