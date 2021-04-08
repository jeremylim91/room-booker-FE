import React, {useState, useEffect} from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import {
  getAllAttendeesByBookingId,
  deleteABooking,
  updateBooking,
} from '../../store.jsx';
import {
  getUserIdFromCookie,
  getIsAdminFromCookie,
} from '../../utils/cookieRelatedFns.mjs';
import TextInputField from '../HOCs/TextInputField.jsx';
import TaggingField from '../HOCs/TaggingField.jsx';
import {getUsers} from '../../createBookingStore.jsx';

export default function EventInfoModal({show, handleClose, event}) {
  const [mtgIsDeleted, setMtgIsDeleted] = useState(false);
  const [agendaInputField, setAgendaInputField] = useState(event.agenda);
  // set a state that contains all mtg attendees that should be tagged in a given meeting
  const [tagsProp, setTagsProp] = useState([]);
  // set a state containing all users that should be sugested for autocomplete
  const [suggestionsProp, setSuggestionsProp] = useState([]);

  useEffect(() => {
    getAllAttendeesByBookingId(setTagsProp, event.id);
  }, [mtgIsDeleted, handleClose]);
  useEffect(() => {
    getUsers(setSuggestionsProp);
  }, [handleClose]);

  // Shorten the agenda to display it as the modal header
  const shortenAgenda = (str) => {
    // return if empty string, otherwise...
    if (!str) return;
    if (str.length > 12) {
      // shorten string and add ellipsis behind
      const shortenedString = str.slice(0, 12);
      return shortenedString.concat('...');
    }
    return str;
  };

  // get the start & end time from the prop and format it as string
  const startTime = moment(event.startTime).format('LT');
  const endTime = moment(event.endTime).format('LT');
  // get the mtg date and format it as a str
  const mtgDate = moment(event.startTime).format('LL');

  const handleDelete = () => {
    // update the db to change selected item's isDeleted field to true
    deleteABooking(handleClose, event.id);
  };

  const checkIfUserIsAdminOrBookingOwner = () => {
    return getUserIdFromCookie() === event.userId || getIsAdminFromCookie();
  };

  const handleSave = () => {
    const {id: bookingId} = event;
    // make an update query to BE
    updateBooking({tagsProp, agendaInputField, bookingId});
    handleClose();
  };

  // conditionally render the delete button if the user's id (in cookies) matches the user Id of the person that iniitated the appointment
  const conditionallyRenderSaveAndDeleteBtn = () => {
    if (checkIfUserIsAdminOrBookingOwner())
      return (
        <>
          <Button variant="secondary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </>
      );
  };

  const conditionallyRenderAgenda = () => {
    // allow the user to edit the agenda if he is either an admin or the owner of the booking
    if (checkIfUserIsAdminOrBookingOwner()) {
      return (
        <Col xs={12}>
          <TextInputField
            label={'Agenda'}
            stateProp={agendaInputField}
            setStateProp={setAgendaInputField}
            placeholder={'Describe the meeting agenda'}
          />
        </Col>
      );
    } else {
      return (
        <>
          <Col xs={3}> Agenda: </Col>
          <Col xs={9}> {event.agenda}</Col>
        </>
      );
    }
  };

  // // map attendees into html lists
  const displayAttendees = () => {
    // Infom user if no attendees were tagged
    if (tagsProp.length === 0)
      return <li> The booker has not tagged any attendees</li>;
    // else, map attendees into a list
    return tagsProp.map((elem) => <li>{elem.username}</li>);
  };

  const conditionallyRenderAttendees = () => {
    // allow the user to edit the agenda if he is either an admin or the owner of the booking
    if (checkIfUserIsAdminOrBookingOwner()) {
      return (
        <Col xs={12}>
          <TaggingField
            suggestionsProp={suggestionsProp}
            setSuggestionsProp={setSuggestionsProp}
            tagsProp={tagsProp}
            setTagsProp={setTagsProp}
            labelProp="Attendees"
          />
        </Col>
      );
    } else {
      return (
        <>
          <Col xs={4}> Attendees: </Col>
          <Col xs={8}>
            <ul>{displayAttendees()}</ul>
          </Col>
        </>
      );
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-90vw">
        <Modal.Header closeButton>
          <Modal.Title>{shortenAgenda(event.agenda)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={3}>Date:</Col> <Col xs={9}> {mtgDate}</Col>
              <Col xs={3}>Room:</Col> <Col xs={9}> {event.roomId}</Col>
              <Col xs={3}>Time:</Col>
              <Col xs={9}>
                {startTime} - {endTime}
              </Col>
              {/* <Col xs={3}>Agenda:</Col>
            <Col xs={9}>{event.agenda}</Col> */}
              {/* {getIsAdminFromCookie() ||
              getUserIdFromCookie === event.userId ? (
                <TextInputField
                  label={'Agenda'}
                  stateProp={agendaInputField}
                  setStateProp={setAgendaInputField}
                  placeholder={'Describe the meeting agenda'}
                />
              ) : (
                <Col></Col>
              )} */}
              {conditionallyRenderAgenda()}
              {conditionallyRenderAttendees()}
              {/* </Col> */}
              {/* <Col xs={12}> */}
              {/* <ol>{displayAttendees()}</ol> */}
              {/* <TaggingField
                suggestionsProp={suggestionsProp}
                setSuggestionsProp={setSuggestionsProp}
                tagsProp={tagsProp}
                setTagsProp={setTagsProp}
                labelProp="Attendees"
              /> */}
              {/* </Col> */}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {conditionallyRenderSaveAndDeleteBtn()}

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
