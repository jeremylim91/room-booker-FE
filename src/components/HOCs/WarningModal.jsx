import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {deleteUser} from '../../store.jsx';

export default function WarningModal(
  ChildComponent,
  show,
  handleClose,
  taggedUsers,
  setTaggedUsers,
  renderTrigger,
  forceRender
) {
  const handleDeleteUser = () => {
    const newTaggedUsers = [...taggedUsers];
    deleteUser(newTaggedUsers, setTaggedUsers);
    // window.location.reload();
    handleClose();
    // renderTrigger.current += 1;
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Attention!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChildComponent users={taggedUsers} />
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
