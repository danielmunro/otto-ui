/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PasswordResetPage';

export default defineMessages({
  pwResetHeader: {
    id: `${scope}.pwReset.header`,
    defaultMessage: 'Use the form below to reset your password',
  },
  pwResetEmail: {
    id: `${scope}.pwReset.email`,
    defaultMessage: 'Email Address',
  },
  pwResetPassword: {
    id: `${scope}.pwReset.password`,
    defaultMessage: 'Password',
  },
  pwResetError: {
    id: `${scope}.pwReset.pwResetError`,
    defaultMessage: 'There was a problem resetting your password',
  },
});
