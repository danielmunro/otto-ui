import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../actions/session';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import Context from '../utils/Context';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setSessionToken, setLoggedInUser, setIsLoggedIn, setUserEmail } = useContext(Context);
  const navigate = useNavigate();

  const tryLogin = async (event) => {
    event.preventDefault();
    const response = await login(email, password);
    if (response.status === 201) {
      const data = await response.json();
      if (data.AuthResponse === 1) {
        setUserEmail(email);
        navigate('/password-reset');
        return;
      }
      if (data.AuthResponse === 3) {
        // failed
        return;
      }
      setLoggedInUser(data.User);
      setIsLoggedIn(true);
      setSessionToken(data.Token);
      console.log("setting session token into local storage");
      localStorage.setItem("token", data.Token);
      navigate("/");
    }
  };

  return (
    <Container title={"Login"}>
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
    </Container>
  )
}
