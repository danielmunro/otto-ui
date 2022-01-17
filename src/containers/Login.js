import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/session';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import Context from '../utils/Context';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setSessionToken, setLoggedInUser, setUserEmail } = useContext(Context);
  const navigate = useNavigate();

  const tryLogin = async (event) => {
    event.preventDefault();
    const response = await login(email, password);
    if (response.status === 201) {
      const data = await response.json();
      setLoggedInUser(data.User);
      if (data.AuthResponse === 1) {
        setUserEmail(email);
        navigate('/password-reset');
        return;
      }
      setSessionToken(data.Token);
      localStorage.setItem("token", data.Token);
      navigate("/");
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <form onSubmit={tryLogin}>
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
        <div className="row">
          <Button
            variant="contained"
            type="submit"
            color="primary"
          >
            Login
          </Button> or <Link href="/signup">Signup</Link>
        </div>
      </form>
    </Container>
  )
}