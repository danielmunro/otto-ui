import { Button, TextField } from '@mui/material';
import { postJSON } from '@tkrotoff/fetch';
import { useState } from 'react';
import Container from '../components/Container';
import Input from '../components/Input';
import { baseUrl } from '../config';
import { fetchPost } from '../utils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const tryLogin = async () => {
    console.log("login", email, password);
    const result = await postJSON(`${baseUrl}/session`, { email, password });
    console.log(result);
  };

  return (
    <Container>
      <h1>Login</h1>
      <div>
        <TextField label="Email/username" variant="standard" onChange={(event) => setEmail(event.target.value)} value={email} />
      </div>
      <div>
        <TextField label="Password" variant="standard" onChange={(event) => setPassword(event.target.value)} value={password} />
      </div>
      <div className="row">
        <Button variant="contained" onClick={tryLogin}>Login</Button>
      </div>
    </Container>
  )
}
