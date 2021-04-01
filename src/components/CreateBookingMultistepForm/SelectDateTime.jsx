import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import {writeStorage, deleteFromStorage} from '@rehooks/local-storage';
import {
  CreateBookingContext,
  CREATE_BOOKING_FORM,
} from '../../createBookingStore';
import {formModes} from '../../createBookingStore.jsx';

export default function SelectDateTime({setMode}) {
  const {
    formStore,
    dispatchBookingForm,
    handleOnChange,
    formLocalStorage,
  } = useContext(CreateBookingContext);

  const {SELECT_DATE_TIME, FORM_STEP} = formModes;

  const handleNextPage = () => {
    setMode(SELECT_DATE_TIME);
    writeStorage(FORM_STEP, SELECT_DATE_TIME);
  };

  const handleCancelForm = () => {
    window.location = '/';
    deleteFromStorage(CREATE_BOOKING_FORM);
    deleteFromStorage(FORM_STEP);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <Button onClick={handleNextPage}> Cancel</Button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Button onClick={handleCancelForm}> Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
}
