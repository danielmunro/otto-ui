import { Button } from '@mui/material';
import { putJSON } from '@tkrotoff/fetch';
import { useContext, useState } from 'react';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import { baseUrl } from '../utils/config';
import Context from '../utils/Context';

export default function PasswordReset() {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const { userEmail } = useContext(Context);

  const tryResetPassword = (event) => {
    event.preventDefault();
    putJSON(`${baseUrl}/session`, { email: userEmail, password: password1 })
    return false;
  };

  return (
    <Container>
      <h1>Password Reset</h1>
      <form onSubmit={tryResetPassword}>
        <div>
          <TextInput
            label="New Password"
            variant="standard"
            type="password"
            value={password1}
            onChangeValue={setPassword1}
          />
        </div>
        <div>
          <TextInput
            label="Confirm New Password"
            variant="standard"
            type="password"
            value={password2}
            onChangeValue={setPassword2}
          />
        </div>
        <div>
          <Button
            variant="contained"
            type="submit"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </Container>
  );
}
