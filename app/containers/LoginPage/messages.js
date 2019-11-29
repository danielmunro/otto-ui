/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.LoginPage';

export default defineMessages({
  loginHeader: {
    id: `${scope}.login.header`,
    defaultMessage: 'Use the form below to login',
  },
  loginEmail: {
    id: `${scope}.login.email`,
    defaultMessage: 'Email Address',
  },
  loginPassword: {
    id: `${scope}.login.password`,
    defaultMessage: 'Password',
  },
});
