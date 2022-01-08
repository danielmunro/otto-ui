import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { postJSON } from '@tkrotoff/fetch';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import { baseUrl } from '../config';
import Context from '../Context';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setSessionToken, setLoggedInUser, setUserEmail } = useContext(Context);
  const navigate = useNavigate();

  const tryLogin = async (event) => {
    event.preventDefault();
    const response = await postJSON(`${baseUrl}/session`, { email, password });
    if (response.status === 201) {
      const data = await response.json();
      setLoggedInUser(data.User);
      if (data.AuthResponse === 1) {
        setUserEmail(email);
        navigate('/password-reset');
        return false;
      }
      console.log("login success", data, data.Token, data.User);
      setSessionToken(data.Token);
      localStorage.setItem("token", data.Token);
      localStorage.setItem("user", data.User);
    }

    return false;
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
