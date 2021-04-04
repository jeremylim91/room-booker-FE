import React, {useContext, useState, useEffect} from 'react';
// import CreateBookingModal from './CreateBookingModal.jsx';
import Button from 'react-bootstrap/Button';
import {RoomBookerContext, getAllEventsByUserId} from '../../store.jsx';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import '../../styles/calendarStyles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  getLowerBoundDate,
  getUpperBoundDate,
} from '../../utils/calendarRelatedFns.mjs';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function Dashboard() {
  // destructure imported vars
  const {store, dispatchBookingForm} = useContext(RoomBookerContext);

  const {loggedInUserId} = store;

  // logic that tells app to get roomId if alr in local storage, else get it from global state

  // ==============local states=====================
  // manage modal display
  const [show, setShow] = useState(false);
  // display all meetings taking place in the room specified by user
  const [allEventsByUserId, setAllEventsByUserId] = useState([]);
  // Meeting details that the user inputs
  const [userSelectionDetails, setuserSelectionDetails] = useState({});
  // ==================================================

  // =======set states to manage modal open/close======
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // =================================================

  // load all events for current user
  useEffect(() => {
    console.log(`running use effect in dashboard`);
    getAllEventsByUserId(setAllEventsByUserId);
  }, []);
  console.log(`allEventsByUserId is:`);
  console.log(allEventsByUserId);

  // this fn runs whenever a user selects a timeslot on the calendar
  // const handleCreateEvent = (e) => {
  //   console.log(e.start);
  //   dispatchBookingForm(updateMeetingStartEndAction(e.start, e.end));
  //   // setuserSelectionDetails(e);
  //   handleShow();
  // };
  return (
    <>
      <Calendar
        localizer={localizer}
        events={
          // check if the state has been set with the user's dates
          Object.keys(allEventsByUserId).length > 0
            ? [
                ...allEventsByUserId.userMeetings,
                ...allEventsByUserId.bookedByUser,
              ]
            : []

          //   {
          //   ...allEventsByUserId.userMeetings,
          //   ...allEventsByUserId.bookedByUser,
          // }
        }
        titleAccessor="agenda"
        startAccessor="startTime"
        endAccessor="endTime"
        // selectable={'ignoreEvents'}
        // onSelectSlot={(e) => {
        //   handleCreateEvent(e);
        // }}
        onSelectEvent={(event) => alert(event.title)}
        defaultView="month"
        views={['month', 'week', 'day']}
        // Determines the selectable time increments in week and day views
        step={30}
        // timeslots={30}
        min={getLowerBoundDate()} // set at 8.00 AM
        max={getUpperBoundDate()} // Max will be 6.00 PM
      />
      <div className="container">
        <div className="row">
          <div className="col">
            <Button onClick={() => {}}> Next</Button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Button onClick={() => {}}> Cancel</Button>
          </div>
        </div>
      </div>
      {/* <CreateBookingModal
        userSelectionDetails={userSelectionDetails}
        show={show}
        handleClose={handleClose}
      /> */}
    </>
  );
}
