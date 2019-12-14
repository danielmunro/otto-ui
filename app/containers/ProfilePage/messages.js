import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProfilePage';

export default defineMessages({
  profileHeader: {
    id: `${scope}.profile.header`,
    defaultMessage: "{username}'s Profile",
  },
});
