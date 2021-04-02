import React, {useContext} from 'react';
import {Form, Button, Container, Row, Col, Modal} from 'react-bootstrap';
import moment from 'moment';

import {writeStorage, deleteFromStorage} from '@rehooks/local-storage';
import {
  CreateBookingContext,
  CREATE_BOOKING_FORM,
  getAllEvents,
  formModes,
} from '../../createBookingStore';

export default function CreateBookingModal({
  userSelectionDetails,
  show,
  handleClose,
}) {
  // destructure imported vars
  const {
    formStore,
    dispatchBookingForm,
    handleOnChange,
    formLocalStorage,
  } = useContext(CreateBookingContext);

  // get the start & end time from the prop and format it as string
  const startTime = moment(userSelectionDetails.start).format('LT');
  const endTime = moment(userSelectionDetails.end).format('LT');

  // get the mtg date and format it as a str
  const mtgDate = moment(userSelectionDetails.start).format('LL');

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={12}>
                Date: {mtgDate}
              </Col>
              <Col xs={6} md={6}>
                Start:{startTime}
              </Col>
              <Col xs={6} md={6}>
                End:{endTime}
              </Col>
            </Row>

            <Form.Group>
              <Row>
                <Col xs={3} md={3}>
                  <Form.Label>Agenda</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    name="agenda"
                    as="textarea"
                    rows={3}
                    value={
                      formLocalStorage.agenda
                        ? formLocalStorage.agenda
                        : formStore.agenda
                    }
                    onChange={handleOnChange}
                    placeholder="Describe the purpose of the meeting"
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
