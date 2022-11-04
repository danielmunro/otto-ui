import { Button } from '@mui/material';
import { postJSON, putJSON } from '@tkrotoff/fetch';
import { useState } from 'react';
import Alert from '../components/Alert';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import { baseUrl } from '../utils/config';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const tryForgotPassword = async (event) => {
    event.preventDefault();
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
      { submitted && (
        <Alert severity="success">
          A password reset request has been submitted. Please check your email.
        </Alert>
      )}
      { error && (
        <Alert severity="error">
          An error occurred, is that email address registered?
        </Alert>
      )}
      <form onSubmit={tryForgotPassword}>
        <div>
          <TextInput
            label="Email Address"
            variant="outlined"
            value={email}
            onChangeValue={setEmail}
            style={{width: 400}}
          />
        </div>
        <div>
          <Button
            variant="contained"
            type="submit"
            disabled={submitted}
          >
            Submit Password Reset Request
          </Button>
        </div>
      </form>
    </Container>
  );
}
