import React, {useState, useContext} from 'react';
import {Button, Form} from 'react-bootstrap';
import {RoomBookerContext, validateUserSignIn} from '../../store.jsx';

export default function SignInForm({handleClose, setFormDisplay}) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const {dispatch} = useContext(RoomBookerContext);

  function handleEmailInput(e) {
    setEmailInput(e.target.value);
  }

  function handlePasswordInput(e) {
    setPasswordInput(e.target.value);
  }

  function handleSignIn() {
    const signInData = {emailInput, passwordInput};
    validateUserSignIn(signInData, dispatch);
    // reset the email and password fields
    setEmailInput('');
    setPasswordInput('');
    handleClose();
  }

  return (
    <div className="login-form">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={emailInput}
            onChange={handleEmailInput}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Password"
            type="password"
            value={passwordInput}
            onChange={handlePasswordInput}
            required
          />
        </Form.Group>
        <div className="col d-flex justify-content-center">
          <Button variant="secondary" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
}
