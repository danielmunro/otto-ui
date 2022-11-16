import { get } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function getNotifications(sessionToken) {
  return get(`${baseUrl}/notification`, {
    headers: {
      'x-session-token': sessionToken,
    }
  });
}
