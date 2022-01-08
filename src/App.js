import { useState } from 'react';
import Home from './containers/Home';
import './App.css';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Context from './Context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [sessionToken, setSessionToken] = useState(null);
  const appContext = {
    sessionToken,
    setSessionToken,
  };

  return (
    <Context.Provider value={appContext}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
