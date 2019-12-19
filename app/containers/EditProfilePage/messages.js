import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EditProfilePage';

export default defineMessages({
  editProfileHeader: {
    id: `${scope}.editProfile.header`,
    defaultMessage: "{username}'s Profile",
  },
  username: {
    id: `${scope}.editProfile.username`,
    defaultMessage: 'Username',
  },
  name: {
    id: `${scope}.editProfile.name`,
    defaultMessage: 'Name',
  },
  birthday: {
    id: `${scope}.editProfile.birthday`,
    defaultMessage: 'Birthday',
  },
  bioMessage: {
    id: `${scope}.editProfile.bioMessage`,
    defaultMessage: 'BioMessage',
  },
});
