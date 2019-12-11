/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  followingPosts: {
    id: `${scope}.followingPosts`,
    defaultMessage: 'Posts',
  },
  suggestedFollows: {
    id: `${scope}.suggestedFollows`,
    defaultMessage: 'People to Follow',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  signup: {
    id: `${scope}.signup`,
    defaultMessage: 'Signup',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
});
