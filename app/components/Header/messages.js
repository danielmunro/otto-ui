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
  myProfile: {
    id: `${scope}.myProfile`,
    defaultMessage: 'My Profile',
  },
  followingPosts: {
    id: `${scope}.followingPosts`,
    defaultMessage: 'Posts',
  },
  suggestedFollows: {
    id: `${scope}.suggestedFollows`,
    defaultMessage: 'People to Follow',
  },
  events: {
    id: `${scope}.events`,
    defaultMessage: 'Events',
  },
  jobs: {
    id: `${scope}.jobs`,
    defaultMessage: 'Job Board',
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
