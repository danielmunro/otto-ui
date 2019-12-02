import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import EmailTextField from '../../components/EmailTextField';
import H2 from '../../components/H2';
import PasswordTextField from '../../components/PasswordTextField';
import { useInjectSaga } from '../../utils/injectSaga';
import { submitPwReset } from '../App/actions';
import {
  makeSelectAuthResponse,
  makeSelectError,
  makeSelectLoading,
  makeSelectPwResetError,
} from '../App/selectors';
import { changeEmail, changeNewPassword } from './actions';
import { makeSelectEmail, makeSelectNewPassword } from './selectors';
import messages from './messages';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

const key = 'password-reset';

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

function PasswordResetPage({
  onSubmitForm,
  pwResetError,
  email = '',
  onChangeEmail,
  newPassword = '',
  onChangeNewPassword,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <div className={classes.paper}>
        <H2>
          <FormattedMessage {...messages.pwResetHeader} />
        </H2>
        <form className={classes.form} onSubmit={onSubmitForm}>
          <EmailTextField
            label={messages.pwResetEmail.defaultMessage}
            error={pwResetError}
            onChange={onChangeEmail}
            className={classes.textField}
            value={email}
            helperText={
              pwResetError ? messages.pwResetError.defaultMessage : ''
            }
          />
          <PasswordTextField
            label={messages.pwResetPassword.defaultMessage}
            name="new_password"
            error={pwResetError}
            onChange={onChangeNewPassword}
            className={classes.textField}
            value={newPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </Container>
  );
}

PasswordResetPage.propTypes = {
  email: PropTypes.string,
  newPassword: PropTypes.string,
  onSubmitForm: PropTypes.func,
  pwResetError: PropTypes.string,
  onChangeEmail: PropTypes.func,
  onChangeNewPassword: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  newPassword: makeSelectNewPassword(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  loginError: makeSelectPwResetError(),
  authResponse: makeSelectAuthResponse(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangeNewPassword: evt => dispatch(changeNewPassword(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitPwReset());
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
)(PasswordResetPage);
