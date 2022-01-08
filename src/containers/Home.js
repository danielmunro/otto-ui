import React from 'react';
import Container from '../components/Container';
import logo from '../logo.svg';

export default function Home() {
  return (
    <Container>
      <header className="App-header">
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
      </header>
    </Container>
  );
}
