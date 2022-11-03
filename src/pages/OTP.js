import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitOtp } from '../actions/user';
import Container from '../components/Container';
import TextInput from '../components/TextInput';

export default function OTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const trySubmitOtp = async (event) => {
    event.preventDefault();
    const response = await submitOtp(email, otp);
    if (response.status === 200) {
      navigate("/login");
    } else {
      setError(true);
    }
  };

  return (
    <Container title="Confirmation Code">
      <form onSubmit={trySubmitOtp}>
        <div>
          <TextInput
            label="Email"
            variant="outlined"
            onChangeValue={setEmail}
            value={email}
            style={{width: 400}}
          />
        </div>
        <div>
          <TextInput
            label="Confirmation Code"
            variant="outlined"
            onChangeValue={setOtp}
            value={otp}
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
    </Container>
  )
}
