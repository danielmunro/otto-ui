import React from 'react';
import Container from '../components/Container';
import logo from '../logo.svg';

export default function HomeSignupPromo() {
  return (
    <Container>
      <h1>Yo</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <a
        className="App-link"
        href="/login"
      >
        Login
      </a>
      <a
        className="App-link"
        href="/signup"
      >
        Sign up
      </a>
    </Container>
  );
}
