import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {RoomBookerContext, deleteUser} from '../../store.jsx';

export default function WarningModal(
  ChildComponent,
  show,
  handleClose,
  props,
  setProps
) {
  const [deleteUserCompleted, setDeleteUserCompleted] = useState('');

  const handleDeleteUser = () => {
    const newProps = {...props};
    deleteUser(newProps, setProps);
    window.location.reload();
    // handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Attention!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChildComponent users={props.tags} />
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
