import { postJSON, get, del } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function createPost(sessionToken, userUuid, newPostText) {
  return postJSON(`${baseUrl}/post`, {
    user: {uuid: userUuid},
    text:  newPostText,
  }, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}

export function deletePost(sessionToken, postUuid) {
  return del(`${baseUrl}/post/${postUuid}`, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}

export function getPostsForUser(sessionToken, userUuid) {
  return get(`${baseUrl}/user/${userUuid}/posts`);
}

export function getFollowPostsForUser(sessionToken, userUuid) {
  return get(`${baseUrl}/post/follows/${userUuid}`);
}

export function getPosts(sessionToken) {
  return get(`${baseUrl}/post`, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}

export function getPost(sessionToken, postUuid) {
  return get(`${baseUrl}/post/${postUuid}`, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}
