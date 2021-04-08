import {dashboardFilters} from '../../store.jsx';

const {ALL_MEETINGS, MY_MEETINGS, ANY, ONYX, PARK, HALO} = dashboardFilters;

const manageMeetingFilter = (calEvents, filter) => {
  switch (filter) {
    case ALL_MEETINGS:
      return calEvents.allMeetings;
    case MY_MEETINGS:
      return calEvents.userMeetings;
    default:
      return calEvents.userMeetings;
  }
};
const manageResourceFilter = (meetingFilterResults, filter) => {
  switch (filter) {
    case ANY:
      return meetingFilterResults;

    // number 1 -3  represents the room's index in the table. However, breaks easily; Need to refactor this after mvp complete
    case ONYX:
      return meetingFilterResults.filter((elem) => elem.roomId === 1);
    case PARK:
      return meetingFilterResults.filter((elem) => elem.roomId === 2);
    case HALO:
      return meetingFilterResults.filter((elem) => elem.roomId === 3);
    default:
      return meetingFilterResults;
  }
};

// fn to get all events depending on the user's filter options
export const getEvents = (calendarEvents, meetingFilter, resourceFilter) => {
  // guard clause: if state has not been updated, return empty arr
  if (calendarEvents.length < 1) return [];

  // filter the meetings depeding on the view: allMeetings vs UserMeetings
  const meetingFilterResults = manageMeetingFilter(
    calendarEvents,
    meetingFilter
  );

  // use the above to narrow further, by displaying results based on which room they are in.
  const meetingAndResourceFilterResults = manageResourceFilter(
    meetingFilterResults,
    resourceFilter
  );
  // convert dates and times in result into js datetime obj (else it will break the calendar)
  meetingAndResourceFilterResults.forEach((elem) => {
    elem.bookingDate = new Date(elem.bookingDate);
    elem.startTime = new Date(elem.startTime);
    elem.endTime = new Date(elem.endTime);
  });

  return meetingAndResourceFilterResults;
};
