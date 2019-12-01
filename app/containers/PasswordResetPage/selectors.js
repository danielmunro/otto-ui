/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPwReset = state => state['password-reset'] || initialState;

const makeSelectEmail = () =>
  createSelector(
    selectPwReset,
    state => state.email,
  );

const makeSelectNewPassword = () =>
  createSelector(
    selectPwReset,
    state => state.newPassword,
  );

export { selectPwReset, makeSelectEmail, makeSelectNewPassword };
