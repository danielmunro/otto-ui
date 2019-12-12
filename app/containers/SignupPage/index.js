import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EmailTextField from '../../components/EmailTextField';
import H1 from '../../components/H1';
import PasswordTextField from '../../components/PasswordTextField';
import { submitSignup } from '../App/actions';
import messages from './messages';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectLoginError,
} from '../App/selectors';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectPasswordConfirm,
  makeSelectUsername,
} from './selectors';
import {
  changeEmail,
  changeUsername,
  changePassword,
  changePasswordConfirm,
} from './actions';
import style from './style';

const key = 'signup';

function SignupPage({
  email = '',
  username = '',
  password = '',
  passwordConfirm = '',
  onSubmitForm,
  onChangeEmail,
  onChangeUsername,
  onChangePassword,
  onChangePasswordConfirm,
  signupError = false,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = style();
  return (
    <Grid item xs={6}>
      <H1>
        <FormattedMessage {...messages.signupHeader} />
      </H1>
      <form className={classes.form} onSubmit={onSubmitForm}>
        <EmailTextField
          label={messages.signupEmail.defaultMessage}
          error={signupError}
          onChange={onChangeEmail}
          className={classes.textField}
          value={email}
          helperText={signupError ? messages.signupError.defaultMessage : ''}
        />
        <TextField
          label={messages.signupUsername.defaultMessage}
          error={signupError}
          onChange={onChangeUsername}
          className={classes.textField}
          value={username}
          helperText={signupError ? messages.signupError.defaultMessage : ''}
        />
        <PasswordTextField
          label={messages.signupPassword.defaultMessage}
          error={signupError}
          onChange={onChangePassword}
          className={classes.textField}
          value={password}
        />
        <PasswordTextField
          id="password_confirm"
          name="password_confirm"
          label={messages.signupPasswordConfirm.defaultMessage}
          error={signupError}
          onChange={onChangePasswordConfirm}
          className={classes.textField}
          value={passwordConfirm}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </Grid>
  );
}

SignupPage.propTypes = {
  email: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  passwordConfirm: PropTypes.string,
  onSubmitForm: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeUsername: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangePasswordConfirm: PropTypes.func,
  signupError: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  passwordConfirm: makeSelectPasswordConfirm(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  loginError: makeSelectLoginError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onChangePasswordConfirm: evt =>
      dispatch(changePasswordConfirm(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitSignup());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SignupPage);
