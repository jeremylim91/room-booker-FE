import React, {useState} from 'react';
import {Modal, Nav} from 'react-bootstrap';
import SignInForm from './SignInForm.jsx';
import RegistrationForm from './RegistrationForm.jsx';

export default function SignInModal({collapseNavBar}) {
  const [show, setShow] = useState(false);
  const [formDisplay, setFormDisplay] = useState('signin');
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    collapseNavBar();
  };

  return (
    <>
      <Nav.Link onClick={handleShow}>Sign in</Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in to book rooms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignInForm
            handleClose={handleClose}
            setFormDisplay={setFormDisplay}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
