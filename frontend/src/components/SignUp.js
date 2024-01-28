import React, {useMemo} from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import '../css/signup.css';
import NavigationBar from "./Navbar";

const SignUp = () => {
  return (
    <div>
        <div className="container">
          <Form className="form-signup">
            <h1 className="text-center mb-5">Sign up here</h1>
            <Form.Group className="mb-3" controlId="formBasicUsername">
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >

              <Form.Control type="text" placeholder="Username123" />
            </FloatingLabel>
            </Form.Group>


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

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
    </div>
  );
}

export default SignUp;
