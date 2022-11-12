import { Alert, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../actions/user';
import Container from '../components/Container';
import PaperContainer from '../components/PaperContainer';
import TextInput from '../components/TextInput';

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
    const newErrors = {};
    if (email.length < 2) {
      newErrors.email = "email address appears to be invalid";
    }
    if (password !== passwordConfirm) {
      newErrors.password = "passwords do not match";
    }
    if (username.length < 2) {
      newErrors.username = "username is too short";
    }
    if (username.length > 16) {
      newErrors.username = "username too long";
    }
    if (inviteCode.length < 7) {
      newErrors.inviteCode = "invite code format appears invalid";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    const response = await signUp(username, email, password, inviteCode);
    if (response.status !== 201) {
      newErrors.serverError = true;
      const data = await response.json();
      newErrors[data.input] = data.message;
      setErrors(e => ({...e, ...newErrors}));
    } else {
      navigate(`/otp?email=${email}`);
    }
  };

  const getPasswordHelperText = () => errors.password ? errors.password : "";

  const getUsernameHelperText = () => errors.username ? errors.username : "";

  const getEmailHelperText = () => errors.email ? errors.email : "";

  const getInviteCodeHelperText = () => errors.inviteCode ? errors.inviteCode : "";

  return (
    <Container title={"Join The Discussion"}>
      {errors.serverError && (
        <div style={{padding: "10px 0 10px 0"}}>
          <Alert severity="error">
            There was an error submitting your request.
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
              style={{ width: 300 }}
              error={ !!errors.email }
              helperText={getEmailHelperText()}
              required
            />
          </div>
          <div>
            <TextInput
              label="Username"
              variant="outlined"
              onChangeValue={setUsername}
              value={username}
              style={{ width: 300 }}
              error={ !!errors.username }
              helperText={getUsernameHelperText()}
              required
            />
          </div>
          <div>
            <TextInput
              label="Password"
              variant="outlined"
              onChangeValue={setPassword}
              value={password}
              type="password"
              style={{ width: 300 }}
              error={ !!errors.password }
              required
            />
          </div>
          <div>
            <TextInput
              label="Password (again)"
              variant="outlined"
              onChangeValue={setPasswordConfirm}
              value={passwordConfirm}
              type="password"
              style={{ width: 300 }}
              error={ !!errors.password }
              helperText={getPasswordHelperText()}
              required
            />
          </div>
          <div>
            <TextInput
              label="Invite Code"
              variant="outlined"
              onChangeValue={setInviteCode}
              value={inviteCode}
              style={{ width: 300 }}
              error={ !!errors.inviteCode }
              helperText={getInviteCodeHelperText()}
              required
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
