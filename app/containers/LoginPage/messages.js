/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  loginHeader: {
    id: `${scope}.login.header`,
    defaultMessage: 'Use the form below to login',
  },
  loginTagLine: {
    id: `${scope}.login.tagLine`,
    defaultMessage: 'Log in below to access your account',
  },
  loginEmail: {
    id: `${scope}.login.email`,
    defaultMessage: 'Email Address',
  },
  loginPassword: {
    id: `${scope}.login.password`,
    defaultMessage: 'Password',
  },
  loginError: {
    id: `${scope}.login.loginError`,
    defaultMessage: 'Email or password were incorrect',
  },
});
