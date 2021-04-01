import React, {useContext} from 'react';
import {Form, Button} from 'react-bootstrap';
import {writeStorage, deleteFromStorage} from '@rehooks/local-storage';
import {
  CreateBookingContext,
  CREATE_BOOKING_FORM,
  loadCategories,
  formModes,
} from '../../createBookingStore.jsx';
import {getUserIdFromCookie} from '../../utils/cookieRelatedFns';

export default function InsertDetails({setMode}) {
  const {
    formStore,
    dispatchListingForm,
    handleOnChange,
    formLocalStorage,
  } = useContext(CreateBookingContext);
  // destructure form modes
  const {FORM_STEP, CONFIRMATION} = formModes;

  // If there is no storage relating to the form, create one now
  if (!formLocalStorage) {
    writeStorage(CREATE_BOOKING_FORM, {});
  }
  // handle what happens if user decides to cancel the form
  const handleCancelForm = () => {
    // setMode('ABOUT_ITEMS');
    window.location = '/';
    deleteFromStorage(CREATE_BOOKING_FORM);
    deleteFromStorage(FORM_STEP);
  };
  // Handle change to next page
  const handleNextPage = () => {
    setMode(CONFIRMATION);
    writeStorage(FORM_STEP, CONFIRMATION);
  };
  // validate that all fields have been filled.

  return (
    <div className="container">
      <div className="row">
        <Form.Group /*className="ml-3 mt-3"*/ controlId="formMtgAgenda">
          <div className="col-2">
            <Form.Label>Agenda &#8727</Form.Label>
          </div>
          <div className="col">
            <Form.Control
              // note: to enable a single onChange for all inputs, 'name' needs to match the key of the intialState in createBookingStore. '
              name="agenda"
              type="text"
              placeholder="Meeting agenda and relevant details"
              value={
                formLocalStorage.title
                  ? formLocalStorage.title
                  : formStore.title
              }
              onChange={handleOnChange}
              required
            />
          </div>
        </Form.Group>
      </div>
    </div>
  );
}
