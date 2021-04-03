import React, {useContext, useState, useEffect} from 'react';
import {
  CreateBookingContext,
  CREATE_BOOKING_FORM,
  getRoomCatalogue,
  updateSelectedRoomAction,
} from '../../createBookingStore';
import {formModes} from '../../createBookingStore.jsx';
import Button from 'react-bootstrap/Button';
// import {handleNextPage, handleCancelForm} from '../../utils/formRelatedFns.mjs';
import {writeStorage, deleteFromStorage} from '@rehooks/local-storage';

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

  const handleRoomSelection = (roomId) => {
    dispatchBookingForm(updateSelectedRoomAction(roomId));
    // add the selected rm to local storage
    //  there doesn't seem to be a need to store the cal events in local storage for now
    writeStorage(CREATE_BOOKING_FORM, {
      ...formLocalStorage,
      roomId: roomId,
    });
  };

  const DisplayRooms = () => {
    return roomCatalogue.map((room, idx) => {
      return (
        <div className="col-4">
          <h2>{room.room_name}</h2>
          <p>Capacity: {room.max_occupancy}</p>
          <button
            type="submit"
            onClick={(e) => {
              // the selected room is in the storage, read from storage
              handleRoomSelection(room.id);
            }}
            style={{border: 'none'}}>
            <img
              src={`${room.thumbnail}`}
              alt="respective room"
              style={{maxWidth: '100%'}}></img>
          </button>
        </div>
      );
    });
  };

  const handleCancelForm = () => {
    // setMode('ABOUT_ITEMS');
    window.location = '/';
    deleteFromStorage(CREATE_BOOKING_FORM);
    deleteFromStorage(FORM_STEP);
  };
  const handleNextPage = () => {
    setMode(SELECT_DATE_TIME);
    writeStorage(FORM_STEP, SELECT_DATE_TIME);
  };

  return (
    <>
      <div className="container">
        {/* <div className="row">
          <div className="col">asf</div>
        </div> */}
        <DisplayRooms />

        <div className="row">
          <div className="col">
            <Button onClick={handleNextPage}> Next</Button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Button onClick={handleCancelForm}>Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
}
