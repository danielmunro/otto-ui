import { Alert, Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../actions/user';
import Container from '../components/Container';
import PaperContainer from '../components/PaperContainer';
import TextInput from '../components/TextInput';
import { env } from '../utils/config';

export default function Signup() {
  const params = new URLSearchParams(document.location.search);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [inviteCode, setInviteCode] = useState(params.get("invite") ?? "");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const trySignup = async (event) => {
    event.preventDefault();
    let hasError = false;
    const newErrors = {};
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
    if (inviteCode.length < 7) {
      newErrors.inviteCode = true;
      hasError = true
    }
    setErrors(newErrors);
    if (hasError) {
      return;
    }
    const response = await signUp(username, email, password, inviteCode);
    if (response.status !== 201) {
      newErrors.serverError = true;
      newErrors.serverErrorMessage = await response.text();
      setErrors(e => ({...e, ...newErrors}));
    } else {
      navigate(`/otp?email=${email}`);
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

  const getUsernameHelperText =
    () => errors.usernameFormat ? "username must be 2-16 alpha-numeric characters" : "";

  const getEmailHelperText = () => errors.emailLength ? "email is required" : "";

  const getInviteCodeHelperText = () => errors.inviteCode ? "Code appears to be a bad format" : "";

  console.log(errors);

  return (
    <Container title={"Join The Discussion"}>
      {errors.serverError && (
        <div style={{padding: "10px 0 10px 0"}}>
          <Alert severity="error">
            There was an error submitting your request: {errors.serverErrorMessage}
          </Alert>
        </div>
      )}
      <PaperContainer>
        <Alert severity="info" sx={{marginBottom: 1}}>
          Third place is currently in <b>closed beta</b>, all sign ups require an invite code.
        </Alert>
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
          <div>
            <TextInput
              label="Invite Code"
              variant="outlined"
              onChangeValue={setInviteCode}
              value={inviteCode}
              style={{width: 400}}
              error={ errors.inviteCode }
              helperText={getInviteCodeHelperText()}
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
      </PaperContainer>
    </Container>
  );
}
