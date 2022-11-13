import { Button } from '@mui/material';
import { postJSON, putJSON } from '@tkrotoff/fetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import Container from '../components/Container';
import PaperContainer from '../components/PaperContainer';
import TextInput from '../components/TextInput';
import { baseUrl } from '../utils/config';
import { useLogin } from '../hooks/login';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const login = useLogin();

  const tryForgotPassword = async (event) => {
    event.preventDefault();
    if (submitted && !error) {
      try {
        await putJSON(`${baseUrl}/forgot-password`, {
          user: {
            username: email,
            password: password,
          },
          code,
        });
        await login(email, password);
        setCompleted(true);
        navigate("/");
      } catch {
        setError(false);
      }
      return;
    }
    setSubmitted(false);
    setError(false);
    try {
      await postJSON(`${baseUrl}/forgot-password`, {username: email});
      setSubmitted(true);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Container title="Account Recovery">
      { submitted && !completed && (
        <Alert severity="info">
          A password reset request has been submitted. Please check your email and provide the code here, along with your new password.
        </Alert>
      )}
      { completed && (
        <Alert severity="success">
          Your password has been successfully reset!
        </Alert>
      )}
      { error && (
        <Alert severity="error">
          An error occurred, is that email address registered?
        </Alert>
      )}
      <PaperContainer>
        <form onSubmit={tryForgotPassword}>
          <div>
            <TextInput
              label="Email Address"
              variant="outlined"
              value={email}
              onChangeValue={setEmail}
              style={{width: 400}}
              disabled={submitted}
            />
          </div>
          { submitted && (
            <div>
              <TextInput
                label="Confirmation Code"
                variant="outlined"
                value={code}
                onChangeValue={setCode}
                style={{width: 400}}
              />
              <TextInput
                label="New Password"
                variant="outlined"
                value={password}
                onChangeValue={setPassword}
                type="password"
                style={{width: 400}}
              />
            </div>
          )}
          <div>
            <Button
              variant="contained"
              type="submit"
              disabled={completed}
            >
              Submit Password Reset Request
            </Button>
          </div>
        </form>
      </PaperContainer>
    </Container>
  );
}
