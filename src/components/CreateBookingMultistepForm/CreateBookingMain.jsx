import React, {useState, useEffect} from 'react';
// import formModes from './FormModes.mjs'
import {useLocalStorage} from '@rehooks/local-storage';
import SelectRoom from './SelectRoom.jsx';
import SelectDateTime from './SelectDateTime.jsx';

// import LoadNewListing from './LoadNewListing.jsx.js';
import {CreateBookingProvider, formModes} from '../../createBookingStore.jsx';

export default function CreateBookingMain() {
  // Modes of the form
  const {SELECT_ROOM, SELECT_DATE_TIME, FORM_STEP} = formModes;
  // Control the state of the multi-step form
  const [mode, setMode] = useState(SELECT_ROOM);

  // Track which mode the form is at
  const [existingMode] = useLocalStorage(FORM_STEP);

  // If the existing mode suggets a different mode, switch to that mode
  useEffect(() => {
    if (existingMode !== SELECT_ROOM && existingMode) {
      setMode(existingMode);
    }
  }, []);

  const manageBookingCreationForm = () => {
    switch (mode) {
      case SELECT_ROOM:
        return <SelectRoom setMode={setMode} />;
      case SELECT_DATE_TIME:
        return <SelectDateTime setMode={setMode} />;

      default:
        return null;
    }
  };
  return (
    <div className="container">
      <CreateBookingProvider>
        {manageBookingCreationForm()}
      </CreateBookingProvider>
    </div>
  );
}
