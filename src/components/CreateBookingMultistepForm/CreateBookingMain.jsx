import React, {useState, useEffect, useContext} from 'react';
// import formModes from './FormModes.mjs'
import {writeStorage, useLocalStorage} from '@rehooks/local-storage';
import SelectRoom from './SelectRoom.jsx';
import SelectDateTime from './SelectDateTime.jsx';
import InsertDetails from './InsertDetails.jsx';
import Confirmation from './Confirmation.jsx';

// import LoadNewListing from './LoadNewListing.jsx.js';
import {
  CreateBookingProvider,
  CREATE_BOOKING_FORM,
  CreateBookingContext,
  formModes,
} from '../../createBookingStore.jsx';

// import {getUserIdFromCookie} from '../../helper.js';

export default function CreateBookingMain() {
  // Modes of the form
  const {
    SELECT_ROOM,
    SELECT_DATE_TIME,
    INSERT_DETAILS,
    CONFIRMATION,
    FORM_STEP,
  } = formModes;
  // Control the state of the multi-step form
  const [mode, setMode] = useState(SELECT_ROOM);

  // Track which mode the form is at
  const [existingMode] = useLocalStorage(FORM_STEP);

  // Redirect user to error page if not signed in
  // useEffect(() => {
  //   const loggedInUserId = getUserIdFromCookie();
  //   if (!loggedInUserId) {
  //     window.location = '/error';
  //   }
  // }, []);

  // If the existing mode suggets a different mode, switch to that mode
  useEffect(() => {
    if (existingMode !== SELECT_ROOM && existingMode) {
      setMode(existingMode);
    }
  }, []);

  const manageListingCreationForm = () => {
    switch (mode) {
      case SELECT_ROOM:
        return <SelectRoom setMode={setMode} />;
      case SELECT_DATE_TIME:
        return <SelectDateTime setMode={setMode} />;
      case INSERT_DETAILS:
        return <InsertDetails setMode={setMode} />;
      case CONFIRMATION:
        return <Confirmation setMode={setMode} />;
      default:
        return null;
    }
  };
  return (
    <div className="container">
      <CreateBookingProvider>
        {manageListingCreationForm()}
      </CreateBookingProvider>
    </div>
  );
}
