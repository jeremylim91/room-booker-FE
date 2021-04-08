import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Dropdown} from 'react-bootstrap';
import {getCalendarEventsDisplay, dashboardFilters} from '../../store.jsx';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import '../../styles/calendarStyles.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventInfoModal from './EventInfoModal.jsx';
import {
  getLowerBoundDate,
  getUpperBoundDate,
} from '../../utils/calendarRelatedFns.mjs';
import {getEvents} from './events.jsx';
import {getUserIdFromCookie} from '../../utils/cookieRelatedFns.mjs';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

export default function Dashboard() {
  // destructure imported vars
  const {ALL_MEETINGS, MY_MEETINGS, ANY, ONYX, PARK, HALO} = dashboardFilters;

  // ==============local states=====================
  // manage modal display
  const [show, setShow] = useState(false);
  // display all meetings taking place in the room specified by user
  // const [allEventsByUserId, setAllEventsByUserId] = useState([]);
  const [calendarEventDisplay, setCalendarEventDisplay] = useState([]);

  const [meetingFilter, setMeetingFilter] = useState(MY_MEETINGS);
  const [resourceFilter, setResourceFilter] = useState(ANY);
  // set a state that stores the event from the user's selection
  const [event, setEvent] = useState('');

  // ==================================================
  // ============useEfects=============================
  // Redirect user to error page if not signed in

  // query db to get data to populate calendar; should hve 1. all meetings, 2. all of user's mtgs
  useEffect(() => {
    getCalendarEventsDisplay(setCalendarEventDisplay);
  }, [show]);

  // guard clause to redirect user if he is not logged in
  if (!getUserIdFromCookie()) {
    window.location = '/error';
    return;
  }

  // set states to manage modal open/close
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectEvent = (e) => {
    setEvent(e);
    handleShow();
  };

  const manageDropdownBtnClick = (mode, relevantSetState) => {
    relevantSetState(mode);
  };

  const ManageFilterDropdown = (filter, dropdownOptions, relevantSetState) =>
    dropdownOptions.map((elem) =>
      elem !== filter ? (
        <Dropdown.Item
          onClick={(e) => manageDropdownBtnClick(elem, relevantSetState)}>
          {elem}
        </Dropdown.Item>
      ) : (
        ''
      )
    );

  const styleMyEvents = (e, startTime, endTime) => {
    if (e.userId === getUserIdFromCookie()) {
      const style = {
        backgroundColor: 'orange',
        color: 'white',
        display: 'block',
        opacity: 0.8,
      };
      return {
        style: style,
      };
    }
  };

  const events = getEvents(calendarEventDisplay, meetingFilter, resourceFilter);

  return (
    <>
      <Container fluid className="ml-2, mr-2, mt-2">
        <Row>
          <Col xs={12} md={2} lg={1} className="mt-2 mb-2">
            Filters:
          </Col>
          <Col xs={12} md={3} lg={2} className="mt-2 mb-2">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                {meetingFilter}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {ManageFilterDropdown(
                  meetingFilter,
                  [MY_MEETINGS, ALL_MEETINGS],
                  setMeetingFilter
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={12} md={3} lg={2} className="mt-2 mb-2">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                {resourceFilter}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {ManageFilterDropdown(
                  resourceFilter,
                  [ANY, ONYX, PARK, HALO],
                  setResourceFilter
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col>
            <Calendar
              localizer={localizer}
              events={events}
              style={{height: '100vh'}}
              titleAccessor="agenda"
              startAccessor="startTime"
              endAccessor="endTime"
              onSelectEvent={handleSelectEvent}
              defaultView="month"
              views={['month', 'week', 'day']}
              // Determines the selectable time increments in week and day views
              step={30}
              // timeslots={30}

              eventPropGetter={styleMyEvents}
              min={getLowerBoundDate()} // set at 8.00 AM
              max={getUpperBoundDate()} // Max will be 6.00 PM
            />
          </Col>
        </Row>
      </Container>
      <Container className="agenda-list-view">
        <Row className="mt-3">
          <Col xs={12}>
            <h3> Upcoming this week:</h3>
          </Col>
          <Col xs={12}>
            <Calendar
              localizer={localizer}
              events={events}
              style={{height: '100vh'}}
              titleAccessor="agenda"
              startAccessor="startTime"
              endAccessor="endTime"
              onSelectEvent={handleSelectEvent}
              toolbar={false}
              defaultView="agenda"
              views={['agenda']}
              step={30}
              // timeslots={30}
              min={getLowerBoundDate()} // set at 8.00 AM
              max={getUpperBoundDate()} // Max will be 6.00 PM
            />
          </Col>
        </Row>
      </Container>

      {show && (
        <EventInfoModal
          show={show}
          handleClose={handleClose}
          event={event}></EventInfoModal>
      )}
    </>
  );
}
