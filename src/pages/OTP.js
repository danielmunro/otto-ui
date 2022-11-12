import { Alert, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { submitOtp } from '../actions/user';
import Container from '../components/Container';
import PaperContainer from '../components/PaperContainer';
import TextInput from '../components/TextInput';

export default function OTP() {
  const params = new URLSearchParams(document.location.search);
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [code, setCode] = useState(params.get("code") ?? "");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const trySubmitOtp = async (event) => {
    if (event) {
      event.preventDefault();
    }
    setError(false);
    try {
      await submitOtp(email, code);
      navigate(`/login?email=${email}`);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    if (email && code) {
      trySubmitOtp(null);
    }
  }, []);

  return (
    <Container title="Confirm Your Account">
      { error && (
        <div style={{padding: "10px 0 10px 0"}}>
          <Alert severity="error">
            There was an error submitting this confirmation code. Please check your email for the right code.
          </Alert>
        </div>
      )}
      <PaperContainer>
        <Typography>
          Check your email for a confirmation code. If you don't have one, try the <Link to="/forgot-password">forgot password</Link> link.
        </Typography>
        <form onSubmit={trySubmitOtp}>
          <div>
            <TextInput
              label="Email"
              variant="outlined"
              onChangeValue={setEmail}
              value={email}
              style={{width: 400}}
              error
            />
          </div>
          <div>
            <TextInput
              label="Confirmation Code"
              variant="outlined"
              onChangeValue={setCode}
              value={code}
              style={{width: 400}}
            />
          </div>
          <div className="row">
            <Button
              variant="contained"
              type="submit"
            >
              Signup
            </Button>
          </div>
        </form>
      </PaperContainer>
    </Container>
  )
}
