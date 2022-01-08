import { Button, TextField } from '@mui/material';
import { postJSON } from '@tkrotoff/fetch';
import { useState } from 'react';
import Container from '../components/Container';
import Input from '../components/Input';
import { baseUrl } from '../config';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const trySignup = async () => {
    console.log("signup", {email, password});
    const result = await postJSON(`${baseUrl}/user`, { email, password });
    console.log(result);
  };

  return (
    <Container>
      <h1>Signup</h1>
      <div>
        <TextField label="Email/username" variant="standard" onChange={(event) => setEmail(event.target.value)} value={email} />
      </div>
      <div>
        <TextField label="Password" variant="standard" onChange={(event) => setPassword(event.target.value)} value={password} />
      </div>
      <div>
        <TextField label="Password (again)" variant="standard" onChange={(event) => setPasswordConfirm(event.target.value)} value={passwordConfirm} />
      </div>
      <div className="row">
        <Button variant="contained" onClick={trySignup}>Signup</Button>
      </div>
    </Container>
  )
}
