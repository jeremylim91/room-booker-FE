import React, {useContext, useState, useEffect} from 'react';
import CreateBookingModal from './CreateBookingModal.jsx';
import Button from 'react-bootstrap/Button';
import {writeStorage, deleteFromStorage} from '@rehooks/local-storage';
import {
  CreateBookingContext,
  CREATE_BOOKING_FORM,
  getAllEvents,
  formModes,
  updateMeetingStartEndAction,
} from '../../createBookingStore';
// import {formModes} from '../../createBookingStore.jsx';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import '../../styles/calendarStyles.scss';
import {
  getLowerBoundDate,
  getUpperBoundDate,
} from '../../utils/calendarRelatedFns.mjs';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

export default function SelectDateTime({setMode}) {
  // destructure imported vars
  const {
    formStore,
    dispatchBookingForm,
    handleOnChange,
    formLocalStorage,
  } = useContext(CreateBookingContext);

  // logic that tells app to get roomId if alr in local storage, else get it from global state
  const roomId = formLocalStorage.roomId
    ? formLocalStorage.roomId
    : formStore.roomId;

  const {SELECT_DATE_TIME, FORM_STEP} = formModes;

  // local states
  const [show, setShow] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [userSelectionDetails, setuserSelectionDetails] = useState({});

  // fns to handle open/close of Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllEvents(setAllEvents, roomId);
    // for now, doesn't seem to be a need for the dates to persist (takes up local storage unecessarily)
    // writeStorage(CREATE_BOOKING_FORM, {
    //   ...formLocalStorage,
    //   [CAL_EVENTS_BY_ROOM_ID]: allEvents,
    // });
  }, []);
  const handleNextPage = () => {
    setMode(SELECT_DATE_TIME);
    writeStorage(FORM_STEP, SELECT_DATE_TIME);
  };

  const handleCancelForm = () => {
    window.location = '/';
    deleteFromStorage(CREATE_BOOKING_FORM);
    deleteFromStorage(FORM_STEP);
  };

  // this fn runs whenever a user selects a timeslot on the calendar
  const handleCreateEvent = (e) => {
    console.log(e.start);
    dispatchBookingForm(updateMeetingStartEndAction(e.start, e.end));
    // setuserSelectionDetails(e);
    handleShow();
  };
  return (
    <>
      <Calendar
        localizer={localizer}
        events={allEvents}
        titleAccessor="agenda"
        startAccessor="startTime"
        endAccessor="endTime"
        selectable={'ignoreEvents'}
        onSelectSlot={(e) => {
          handleCreateEvent(e);
        }}
        onSelectEvent={(event) => alert(event.title)}
        defaultView="month"
        views={['month', 'week', 'day']}
        // Determines the selectable time increments in week and day views
        step={30}
        // timeslots={30}
        min={getLowerBoundDate()} // 8.00 AM
        max={getUpperBoundDate()} // Max will be 6.00 PM!
      />
      <div className="container">
        <div className="row">
          <div className="col">
            <Button onClick={handleNextPage}> Next</Button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Button onClick={handleCancelForm}> Cancel</Button>
          </div>
        </div>
      </div>
      <CreateBookingModal
        userSelectionDetails={userSelectionDetails}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}
