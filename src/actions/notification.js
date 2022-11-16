import { get, patchJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function getNotifications(sessionToken) {
  return get(`${baseUrl}/notification`, {
    headers: {
      'x-session-token': sessionToken,
    }
  });
}

export function acknowledgeNotifications(sessionToken, lastNotification, firstNotification) {
  return patchJSON(
    `${baseUrl}/notification`,
    {
      datetime_started: lastNotification.created_at,
      datetime_ended: firstNotification.created_at,
    },
    {
      headers: {
      'x-session-token': sessionToken,
    },
  })
}
