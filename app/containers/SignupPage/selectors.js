/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSignup = state => state.signup || initialState;

const makeSelectEmail = () =>
  createSelector(
    selectSignup,
    loginState => loginState.email,
  );

const makeSelectPassword = () =>
  createSelector(
    selectSignup,
    loginState => loginState.password,
  );

const makeSelectPasswordConfirm = () =>
  createSelector(
    selectSignup,
    loginState => loginState.passwordConfirm,
  );

export {
  selectSignup,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectPasswordConfirm,
};
