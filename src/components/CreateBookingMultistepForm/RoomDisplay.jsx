import React, {useContext} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {
  CreateBookingContext,
  CREATE_BOOKING_FORM,
  updateSelectedRoomAction,
  formModes,
} from '../../createBookingStore';
import {writeStorage} from '@rehooks/local-storage';

export default function RoomDisplay({
  roomPhotoUrl,
  roomName,
  capacity,
  setMode,
  roomId,
}) {
  const {SELECT_DATE_TIME, FORM_STEP} = formModes;

  const {dispatchBookingForm, formLocalStorage} = useContext(
    CreateBookingContext
  );
  const handleRoomSelection = () => {
    dispatchBookingForm(updateSelectedRoomAction(roomId));
    // add the current room to local storage
    writeStorage(CREATE_BOOKING_FORM, {
      ...formLocalStorage,
      roomId: roomId,
    });
    setMode(SELECT_DATE_TIME);
    writeStorage(FORM_STEP, SELECT_DATE_TIME);
  };

  // const handleBtnClick = () => {
  //   handleRoomSelection();
  //   handleNextPage();
  // };
  return (
    <Row>
      <Col xs={8}>
        {/* place image here */}
        <img
          src={`${roomPhotoUrl}`}
          alt="respective room"
          style={{maxWidth: '90%'}}></img>
      </Col>
      <Col xs={4}>
        <Row>
          <Col xs={12}>
            <h5>{roomName}</h5>
          </Col>
          <Col xs={12}>
            <h6>Seating Capacity: {capacity}</h6>
          </Col>
          <Col xs={12}>
            <Button onClick={handleRoomSelection}>Find dates</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
