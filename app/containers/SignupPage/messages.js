/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SignupPage';

export default defineMessages({
  signupHeader: {
    id: `${scope}.signup.header`,
    defaultMessage: 'Use the form below to sign up',
  },
  signupEmail: {
    id: `${scope}.signup.email`,
    defaultMessage: 'Email Address',
  },
  signupUsername: {
    id: `${scope}.signup.username`,
    defaultMessage: 'Username',
  },
  signupPassword: {
    id: `${scope}.signup.password`,
    defaultMessage: 'Password',
  },
  signupPasswordConfirm: {
    id: `${scope}.signup.passwordConfirm`,
    defaultMessage: 'Confirm Password',
  },
  signupError: {
    id: `${scope}.signup.signupError`,
    defaultMessage: 'There was a problem signing up.',
  },
});
