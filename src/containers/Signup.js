import { Button, Link, TextField } from '@mui/material';
import { postJSON } from '@tkrotoff/fetch';
import { useState } from 'react';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import { baseUrl } from '../config';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const trySignup = async (event) => {
    event.preventDefault();
    console.log("signup", {email, password});
    const result = await postJSON(`${baseUrl}/user`, { email, password });
    console.log(result);
    return false;
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
