import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ component: Component }) {
  const isAuthenticated = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate.push("/useLogin");
    }
  }, []);

  return (
    <Component />
  );
}
