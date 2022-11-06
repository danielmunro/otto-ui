import { Button, Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import Context from '../utils/Context';
import { useLogin } from '../hooks/login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn } = useContext(Context);
  const navigate = useNavigate();
  const login = useLogin();

  const tryLogin = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Container title={"Login"}>
      <Paper sx={{p: 1}}>
        <form onSubmit={tryLogin}>
          <div>
            <TextInput
              label="Email/username"
              variant="outlined"
              onChangeValue={setEmail}
              value={email}
              style={{width: 400}}
            />
          </div>
          <div>
            <TextInput
              label="Password"
              variant="outlined"
              onChangeValue={setPassword}
              value={password}
              type="password"
              style={{width: 400}}
            />
          </div>
          <div className="row">
            <Button
              variant="contained"
              type="submit"
              color="primary"
            >
              Login
            </Button> or <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </form>
      </Paper>
    </Container>
  )
}
