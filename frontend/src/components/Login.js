import React, {useMemo} from 'react';
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import '../css/login.css';

const Login = () => {
  return (
    <div className="container">
      <Form className="form-login">
        <h1 className="text-center mb-5">Login here</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >

            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
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
