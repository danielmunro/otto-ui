import { postJSON, get, del, putJSON } from '@tkrotoff/fetch';
import { baseUrl } from '../utils/config';

export function createPost(sessionToken, userUuid, newPostText, draft, images) {
  return postJSON(`${baseUrl}/post`, {
    user: {uuid: userUuid},
    text:  newPostText,
    draft,
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

export function getDraftPosts(sessionToken) {
  return get(`${baseUrl}/post/draft`, {
    headers: {
      'x-session-token': sessionToken,
    }
  });
}

export function getPostsForUser(sessionToken, username) {
  return get(`${baseUrl}/posts/${username}`, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}

export function getLikedPostsForUser(username) {
  return get(`${baseUrl}/likes/${username}`);
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

export function updatePost(sessionToken, uuid, text, draft) {
  return putJSON(`${baseUrl}/post`, {
    uuid,
    text,
    draft,
  }, {
    headers: {
      'x-session-token': sessionToken,
    },
  });
}
