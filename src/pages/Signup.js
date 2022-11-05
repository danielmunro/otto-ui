import { Alert, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../actions/user';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import { env } from '../utils/config';

function getNewErrorsState() {
  return {
    passwordMatch: false,
    passwordLength: false,
    usernameFormat: false,
    emailLength: false,
    serverError: false,
  };
}

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState(getNewErrorsState());
  const navigate = useNavigate();

  const trySignup = async (event) => {
    event.preventDefault();
    let hasError = false;
    const newErrors = getNewErrorsState();
    if (email.length < 2) {
      newErrors.emailLength = true;
      hasError = true;
    }
    if (password !== passwordConfirm) {
      newErrors.passwordMatch = true;
      hasError = true;
    }
    if (password.length < 8) {
      newErrors.passwordLength = true;
      hasError = true;
    }
    if (username.length < 2 || username.length > 16) {
      newErrors.usernameFormat = true;
      hasError = true;
    }
    setErrors(newErrors);
    if (hasError) {
      return;
    }
    try {
      await signUp(username, email, password);
      navigate("/otp");
    } catch (e) {
      newErrors.serverError = true;
      setErrors(newErrors);
    }
  };

  const getPasswordHelperText = () => {
    if (errors.passwordMatch) {
      return "passwords do not match"
    }
    if (errors.passwordLength) {
      return "password is too short"
    }
    return ""
  };

  const getUsernameHelperText = () => {
    if (errors.usernameFormat) {
      return "username must be 2-16 alpha-numeric characters"
    }
    return ""
  };

  const getEmailHelperText = () => {
    if (errors.emailLength) {
      return "email is required"
    }
    return ""
  };

  if (env === "prod") {
    return (
      <Container title={"Join The Discussion"}>
        <Typography variant="h1">
          Coming Soon
        </Typography>
      </Container>
    );
  }

  return (
    <Container title={"Join The Discussion"}>
      {errors.serverError && (
        <div style={{padding: "10px 0 10px 0"}}>
          <Alert severity="error">
            There was an error submitting your account information. Did you <Link to="/forgot-password">forget your password?</Link>
          </Alert>
        </div>
      )}
      <form onSubmit={trySignup}>
        <div>
          <TextInput
            label="Email"
            variant="outlined"
            onChangeValue={setEmail}
            value={email}
            style={{width: 400}}
            error={ errors.emailLength }
            helperText={getEmailHelperText()}
          />
        </div>
        <div>
          <TextInput
            label="Username"
            variant="outlined"
            onChangeValue={setUsername}
            value={username}
            style={{width: 400}}
            error={ errors.usernameFormat === true }
            helperText={getUsernameHelperText()}
          />
        </div>
        <div>
          <TextInput
            label="Password"
            variant="outlined"
            onChangeValue={setPassword}
            value={password}
            type="password"
            style={{width: 400}}
            error={ errors.passwordMatch || errors.passwordLength }
          />
        </div>
        <div>
          <TextInput
            label="Password (again)"
            variant="outlined"
            onChangeValue={setPasswordConfirm}
            value={passwordConfirm}
            type="password"
            style={{width: 400}}
            error={ errors.passwordMatch || errors.passwordLength }
            helperText={getPasswordHelperText()}
          />
        </div>
        <div className="row">
          <Button
            variant="contained"
            onClick={trySignup}
            type="submit"
          >
            Signup
          </Button>
        </div>
      </form>
    </Container>
  );
}
