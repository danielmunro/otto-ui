import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, role }) {
  const isAuthenticated = true; // lol
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate.push("/login");
    }
  }, []);

  return (
    <Component />
  );
}
