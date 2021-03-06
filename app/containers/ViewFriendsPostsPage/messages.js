/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ViewFriendsPostsPage';

export default defineMessages({
  viewFriendsPostsHeader: {
    id: `${scope}.viewFriendsPosts.header`,
    defaultMessage: 'Posts from users you follow',
  },
  createPost: {
    id: `${scope}.viewFriendsPosts.createPost`,
    defaultMessage: 'Share a thought',
  },
  postMessageSuccess: {
    id: `${scope}.viewFriendsPosts.postMessageSuccess`,
    defaultMessage: 'Post was successful!',
  },
});
