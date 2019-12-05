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
});
