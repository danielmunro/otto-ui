import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import EmailTextField from '../../components/EmailTextField';
import PasswordTextField from '../../components/PasswordTextField';
import { submitLogin } from '../App/actions';
import H2 from '../../components/H2';
import messages from './messages';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectLoginError,
  makeSelectAuthResponse,
} from '../App/selectors';
import { makeSelectEmail, makeSelectPassword } from './selectors';
import { changeEmail, changePassword } from './actions';
import { AUTH_CHALLENGE_NEW_PASSWORD } from '../App/constants';

const key = 'login';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    margin: theme.spacing(1),
    width: 300,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage({
  email = '',
  password = '',
  onSubmitForm,
  onChangeEmail,
  onChangePassword,
  loginError = false,
  authResponse = null,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();
  if (authResponse === AUTH_CHALLENGE_NEW_PASSWORD) {
    return <Redirect to="/password-reset" />;
  }
  return (
    <Container maxWidth="sm">
      <div className={classes.paper}>
        <H2>
          <FormattedMessage {...messages.loginHeader} />
        </H2>
        <form className={classes.form} onSubmit={onSubmitForm}>
          <EmailTextField
            label={messages.loginEmail.defaultMessage}
            error={loginError}
            onChange={onChangeEmail}
            className={classes.textField}
            value={email}
            helperText={loginError ? messages.loginError.defaultMessage : ''}
          />
          <PasswordTextField
            label={messages.loginPassword.defaultMessage}
            error={loginError}
            onChange={onChangePassword}
            className={classes.textField}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

LoginPage.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onSubmitForm: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  loginError: PropTypes.bool,
  authResponse: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  loginError: makeSelectLoginError(),
  authResponse: makeSelectAuthResponse(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitLogin());
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
)(LoginPage);
