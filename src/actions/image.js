import { get } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export default function getImage(uuid) {
  return get(`${baseUrl}/image/${uuid}`);
}
