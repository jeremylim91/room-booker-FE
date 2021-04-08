import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import React from 'react';
import {deleteUser} from '../../store.jsx';

export default function WarningModal({
  show,
  handleClose,
  taggedUsers,
  setTaggedUsers,
}) {
  const handleDeleteUser = () => {
    const newTaggedUsers = [...taggedUsers];
    deleteUser(newTaggedUsers, setTaggedUsers);
    handleClose();
  };
  const displayAttendees = () => {
    return taggedUsers.map((taggedUser) => (
      <li key={taggedUser.id}> {taggedUser.name}</li>
    ));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Attention!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>The following users will be removed:</Col>
            </Row>
            <Row>
              <Col>{displayAttendees()}</Col>
            </Row>
          </Container>
          {/* <ChildComponent users={taggedUsers} /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-danger" onClick={handleDeleteUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
