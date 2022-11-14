import { Button } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import PaperContainer from '../components/PaperContainer';
import TextInput from '../components/TextInput';
import { useLogin } from '../hooks/login';

export default function Login() {
  const params = new URLSearchParams(document.location.search);
  const [email, setEmail] = useState(params.get('email') ?? '');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const login = useLogin();

  const tryLogin = async (event) => {
    event.preventDefault();
    const response = await login(email, password);
    if (response.status !== 201) {
      const data = await response.json();
      const newErrors = {};
      newErrors[data.input] = data.message;
      setErrors(newErrors);
    }
  };

  return (
    <Container title={"Login"}>
      <PaperContainer>
        <form onSubmit={tryLogin}>
          <div>
            <TextInput
              label="Email/username"
              variant="outlined"
              onChangeValue={setEmail}
              value={email}
              style={{ width: 300 }}
              error={!!errors.email}
              helperText={errors.email ? errors.email : ''}
              required
            />
          </div>
          <div>
            <TextInput
              label="Password"
              variant="outlined"
              onChangeValue={setPassword}
              value={password}
              type="password"
              style={{ width: 300 }}
              error={!!errors.password}
              helperText={errors.password ? errors.password : ''}
              required
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
      </PaperContainer>
    </Container>
  )
}
