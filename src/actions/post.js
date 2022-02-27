import { postJSON, get, del } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function createPost(sessionToken, userUuid, newPostText, images) {
  return postJSON(`${baseUrl}/post`, {
    user: {uuid: userUuid},
    text:  newPostText,
    images,
  }, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}

export function createShare(sessionToken, userUuid, newPostText, images, postUuid) {
  return postJSON(`${baseUrl}/share`, {
    user: {uuid: userUuid},
    post: {uuid: postUuid},
    text:  newPostText,
    images,
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

export function getPostsForUser(sessionToken, username) {
  return get(`${baseUrl}/user/${username}/posts`, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}

export function getLikedPostsForUser(username) {
  return get(`${baseUrl}/user/${username}/like`);
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
