import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      console.log("Login response:", response.data);

      const userId = response.data.user.Id;
      localStorage.setItem('userId', userId);

      navigate('/');
      window.location.reload();
    } catch (error) {
      setErrorMessage("Invalid username or password");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <Form className="form-login" onSubmit={handleSubmit}>
        <h1 className="header text-center mb-5">Login here</h1>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="checkbox mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
