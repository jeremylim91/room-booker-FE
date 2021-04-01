import React, {useContext, useState, useEffect} from 'react';
import {
  CreateBookingContext,
  CREATE_BOOKING_FORM,
  getRoomCatalogue,
} from '../../createBookingStore';
import {formModes} from '../../createBookingStore.jsx';
import Button from 'react-bootstrap/Button';
// import {handleNextPage, handleCancelForm} from '../../utils/formRelatedFns.mjs';
import {writeStorage, deleteFromStorage} from '@rehooks/local-storage';

export default function SelectRoom({setMode}) {
  const {
    formStore,
    dispatchBookingForm,
    handleOnChange,
    formLocalStorage,
  } = useContext(CreateBookingContext);
  const {SELECT_DATE_TIME, FORM_STEP} = formModes;

  const [roomCatalogue, setRoomCatalogue] = useState([]);

  // on page load, query the db to get data on the available rooms
  useEffect(() => {
    getRoomCatalogue(setRoomCatalogue);
  }, []);

  const DisplayRooms = () => {
    console.log(`roomCatalogue is:`);
    console.log(roomCatalogue);
    return roomCatalogue.map((room, idx) => {
      return (
        <div className="col-4">
          <img src={`${room.thumbnail}`} alt="respective room"></img>
          <p>{room.room_name}</p>
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
