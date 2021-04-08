import React, {useContext, useState, useEffect} from 'react';
import {
  CreateBookingContext,
  CREATE_BOOKING_FORM,
  getRoomCatalogue,
  updateSelectedRoomAction,
} from '../../createBookingStore';
import {formModes} from '../../createBookingStore.jsx';
import {Container, Row, Col, Button} from 'react-bootstrap';
// import {handleNextPage, handleCancelForm} from '../../utils/formRelatedFns.mjs';
import {writeStorage, deleteFromStorage} from '@rehooks/local-storage';
import RoomDisplay from './RoomDisplay.jsx';
import {useHistory} from 'react-router-dom';

export default function SelectRoom({setMode}) {
  // perfrom destructuring on importated vars
  const {
    formStore,
    dispatchBookingForm,
    handleOnChange,
    formLocalStorage,
  } = useContext(CreateBookingContext);
  const {SELECT_DATE_TIME, FORM_STEP} = formModes;

  // set a state comprised of rooms to display to user
  const [roomCatalogue, setRoomCatalogue] = useState([]);

  // (No need for now): set a var for storing the selected room in local storage (to enable persistence)
  const ROOM_ID = 'ROOM_ID';

  // if there isn't storage for form info to persist, create it:
  if (!formLocalStorage) {
    writeStorage(CREATE_BOOKING_FORM);
  }

  // on page load, query the db to get data on the available rooms
  useEffect(() => {
    getRoomCatalogue(setRoomCatalogue);
  }, []);

  const DisplayRooms = () => {
    return roomCatalogue.map((room, idx) => {
      return (
        <RoomDisplay
          roomPhotoUrl={room.thumbnail}
          roomName={room.roomName}
          capacity={room.maxOccupancy}
          roomId={room.id}
          setMode={setMode}
        />
      );
    });
  };

  const history = useHistory();

  const handleCancelForm = () => {
    deleteFromStorage(CREATE_BOOKING_FORM);
    deleteFromStorage(FORM_STEP);
    history.push('/');
  };

  return (
    <Container className="mt-2 mb-3">
      <DisplayRooms />

      <Row>
        <Col className="d-flex justify-content-center m-3">
          <Button variant="outline-danger" onClick={handleCancelForm}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
