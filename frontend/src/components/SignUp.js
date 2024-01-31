import React, { useState } from 'react';
import {Form, Button, FloatingLabel, Alert} from 'react-bootstrap';
import axios from 'axios';
import '../css/signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    haslo: ''
  });
  const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage({ type: '', message: '' });
    try {
      const response = await axios.post('http://localhost:3001/uzytkownicy', formData);
      setAlertMessage({ type: 'success', message: 'User successfully registered!' });
    } catch (error) {
      if (error.response) {
        setAlertMessage({ type: 'danger', message: error.response.data.error });
      } else {
        setAlertMessage({ type: 'danger', message: 'An error occurred. Please try again later.' });
      }
    }
  };

  return (
    <div className="container">
      <Form className="form-signup" onSubmit={handleSubmit}>
        <h1 className="header text-center mb-5">Sign up here</h1>
        {alertMessage.message &&
          <Alert variant={alertMessage.type} className="mb-3">
            {alertMessage.message}
          </Alert>
        }

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
            <Form.Control type="email" placeholder="Email" name="email" onChange={handleInputChange} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
            <Form.Control type="text" placeholder="Username" name="username" onChange={handleInputChange} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
            <Form.Control type="password" placeholder="Password" name="haslo" onChange={handleInputChange} />
          </FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="submit">Sign Up</Button>
      </Form>
    </div>
  );
}

export default SignUp;
