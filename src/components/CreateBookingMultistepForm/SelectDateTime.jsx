import React, {useContext, useState, useEffect, useRef} from 'react';
import CreateBookingModal from './CreateBookingModal.jsx';
import {Button, Container, Row, Col} from 'react-bootstrap';
import {deleteFromStorage} from '@rehooks/local-storage';
import {
  CreateBookingContext,
  CREATE_BOOKING_FORM,
  getAllEvents,
  formModes,
  updateMeetingStartEndAction,
} from '../../createBookingStore';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import '../../styles/calendarStyles.scss';
import {
  getLowerBoundDate,
  getUpperBoundDate,
} from '../../utils/calendarRelatedFns.mjs';
import {getUserIdFromCookie} from '../../utils/cookieRelatedFns.mjs';
import {useHistory} from 'react-router-dom';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

export default function SelectDateTime({setMode}) {
  // destructure imported vars
  const {formStore, dispatchBookingForm, formLocalStorage} = useContext(
    CreateBookingContext
  );

  // logic that tells app to get roomId if alr in local storage, else get it from global state
  const roomId = formLocalStorage.roomId
    ? formLocalStorage.roomId
    : formStore.roomId;

  const {FORM_STEP} = formModes;

  // ============useStates=============================
  const [show, setShow] = useState(false);
  const [allEvents, setAllEvents] = useState([]);

  // ==================================================
  // ============useEfects=============================
  // Redirect user to error page if not signed in

  useEffect(() => {
    getAllEvents(setAllEvents, roomId, dict);
  }, []);
  // ==================================================
  // ============Other React Hooks=============================
  const history = useHistory();
  const useRefContainer = useRef({});
  // ==================================================

  const loggedInUserId = getUserIdFromCookie();
  if (!loggedInUserId) {
    window.location = '/error';
    return;
  }
  // fns to handle open/close of Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dict = useRefContainer.current;

  const handleCancelForm = () => {
    deleteFromStorage(CREATE_BOOKING_FORM);
    deleteFromStorage(FORM_STEP);
    history.push('/');
  };

  // this fn runs whenever a user selects a timeslot on the calendar
  const handleCreateEvent = (e) => {
    // short-term soln to prevent booking creation in month view: disallow modal pop-up if start time is 12 am (i.e. the default)
    const startTime = moment(e.start).format('LT');
    if (startTime === '12:00 AM') return;

    dispatchBookingForm(updateMeetingStartEndAction(e.start, e.end));
    handleShow();
  };

  const handleSelectSlot = (e) => {
    const conflictPresent = cancelSelectionIfConflict(e);

    switch (conflictPresent) {
      case true:
        break;
      case false:
        handleCreateEvent(e);
        break;
      default:
        handleCreateEvent(e);
        break;
    }
  };

  const cancelSelectionIfConflict = (e) => {
    const format = 'hh:mm:ss';

    const eventDate = moment(e.start).format('l');
    const eventStartTime = moment(e.start, format);
    const eventEndTime = moment(e.end, format);

    const bookingsForCurrDate = dict[`${eventDate}`];

    // guard clause
    if (bookingsForCurrDate === undefined) return;

    // loop thru events of a particuarl date to to see if there are time conflicts
    bookingsForCurrDate.forEach((currBooking) => {
      const currBookingStartTime = moment(currBooking.startTime, format);
      const currBookingEndTime = moment(currBooking.endTime, format);
      if (currBookingStartTime.isBetween(eventStartTime, eventEndTime)) {
        return true;
      }
      if (currBookingEndTime.isBetween(eventStartTime, eventEndTime)) {
        return true;
      }
    });
    return false;
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
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => alert(event.agenda)}
        defaultView="week"
        views={['month', 'week', 'day']}
        step={30}
        min={getLowerBoundDate()} // 8.00 AM
        max={getUpperBoundDate()} // Max will be 6.00 PM
      />
      <Container fluid className="mt-2">
        <Row>
          <Col className="d-flex justify-content-center m-3">
            <Button variant="outline-danger" onClick={handleCancelForm}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
      <CreateBookingModal show={show} handleClose={handleClose} />
    </>
  );
}
