import { Button, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../actions/user';
import Container from '../components/Container';
import TextInput from '../components/TextInput';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const trySignup = async (event) => {
    event.preventDefault();
    const response = await signUp(email, password);
    if (response.status === 201) {
      navigate("/login");
    }
  };

  return (
    <Container>
      <h1>Signup</h1>
      <form onSubmit={trySignup}>
        <div>
          <TextInput
            label="Email/username"
            variant="standard"
            onChangeValue={setEmail}
            value={email}
          />
        </div>
        <div>
          <TextInput
            label="Password"
            variant="standard"
            onChangeValue={setPassword}
            value={password}
            type="password"
          />
        </div>
        <div>
          <TextInput
            label="Password (again)"
            variant="standard"
            onChangeValue={setPasswordConfirm}
            value={passwordConfirm}
            type="password"
          />
        </div>
        <div className="row">
          <Button
            variant="contained"
            onClick={trySignup}
            type="submit"
          >
            Signup
          </Button> or <Link href="/login">Login</Link>
        </div>
      </form>
    </Container>
  )
}
