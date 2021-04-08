import React, {useReducer} from 'react';
import {writeStorage, useLocalStorage} from '@rehooks/local-storage';
import axios from 'axios';
import {BACKEND_URL} from './store.jsx';
import moment from 'moment';

// This store deals solely with what goes on in the multistep form

/* ********************************
 * ********************************
 * Modes of the Create Booking Form
 * ********************************
 * *********************************/

// create vars tt reduce spelling errors when handling form modes
export const formModes = {
  SELECT_ROOM: 'SELECT_ROOM',
  SELECT_DATE_TIME: 'SELECT_DATE_TIME',
  INSERT_DETAILS: 'INSERT_DETAILS',
  CONFIRMATION: 'CONFIRMATION',
  FORM_STEP: 'FORM_STEP',
};

// Name of the createBookingForm
export const CREATE_BOOKING_FORM = 'CREATE_BOOKING_FORM';

/* ********************************
 * ********************************
 * INITIAL STATE
 * ********************************
 * *********************************/
// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store

export const initialFormState = {
  roomId: '',
  startTime: null,
  endTime: null,
  agenda: ' ',
  attendees: [],
  meetingDate: '',
};

/* ********************************
 * ********************************
 * ACTION DESCRIPTOR
 * ********************************
 * *********************************/

// Define each action to do on the data defined in the initial state

// used to load list of rooms
// const GET_ROOM_CATALOGUE = 'GET_ROOM_CATALOGUE';

// save the user-selected room's id to the state
const UPDATE_SELECTED_ROOM = 'UPDATE_SELECTED_ROOM';

// add a new mtg to the calendar
const CREATE_NEW_MEETING = 'CREATE_NEW_MEETING';

// update the mtg start and end time
const UPDATE_MEETING_START_END = 'UPDATE_MEETING_START_END';
// update the agenda
const UPDATE_AGENDA = 'UPDATE_AGENDA';

// add or remove meeting attendees
const UPDATE_ATTENDEES = 'UPDATE_ATTENDEES';

/* ********************************
 * ********************************
 * REDUCER FUNCTION
 * ********************************
 * *********************************/

// define the matching reducer function
export function createBookingReducer(state, action) {
  switch (action.type) {
    case UPDATE_SELECTED_ROOM:
      return {...state, roomId: action.payload.roomId};

    case CREATE_NEW_MEETING:
      return {...state};
    case UPDATE_MEETING_START_END:
      return {
        ...state,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
      };

    case UPDATE_AGENDA:
      return {
        ...state,
        agenda: action.payload.agenda,
      };

    case UPDATE_ATTENDEES:
      return {
        ...state,
        attendees: action.payload.newAttendeesList,
      };

    default:
      return null;
  }
}

/* ********************************
 * ********************************
 * ACTION-GENERATING FNS
 * ********************************
 * *********************************/
// The following action-generating functions are commonly referred to
// as "action creators". They accept any input relevant to the action,
// and return an object that represents that action, which is typically
// passed to the dispatch function. Actions always contain a type attribute
// used to identify the action and tell the reducer what logic to run.
export function updateSelectedRoomAction(roomId) {
  return {
    type: UPDATE_SELECTED_ROOM,
    payload: {
      roomId,
    },
  };
}
export function updateMeetingStartEndAction(startTime, endTime) {
  return {
    type: UPDATE_MEETING_START_END,
    payload: {
      startTime,
      endTime,
    },
  };
}
export function updateAgendaAction(agenda) {
  return {
    type: UPDATE_AGENDA,
    payload: {
      agenda,
    },
  };
}
export function updateAttendeesAction(newAttendeesList) {
  return {
    type: UPDATE_ATTENDEES,
    payload: {
      newAttendeesList,
    },
  };
}

/* ********************************
 * ********************************
 *        Provider Code
 * ********************************
 * *********************************/

// In this section we extract out the provider HOC

export const CreateBookingContext = React.createContext(null);
const {Provider} = CreateBookingContext;

// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function CreateBookingProvider({children}) {
  const [formStore, dispatchBookingForm] = useReducer(
    createBookingReducer,
    initialFormState
  );

  // extract local storage so tt it is accessible later
  const [formLocalStorage] = useLocalStorage(CREATE_BOOKING_FORM);
  // check if local storage containing form progress exists
  if (!formLocalStorage) {
    writeStorage(CREATE_BOOKING_FORM, {});
  }

  const handleOnChange = (actionDescriptor, e) => {
    dispatchBookingForm(actionDescriptor(e.target.value));
    writeStorage(CREATE_BOOKING_FORM, {
      ...formLocalStorage,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Provider
      value={{
        // curr/updated state:
        formStore,
        // dispatch fn to augment state
        dispatchBookingForm,
        // manage changes to text fields in form
        handleOnChange,
        // data saved in local storage
        formLocalStorage,
      }}>
      {children}
    </Provider>
  );
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Requests
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// In this section we extract out the
// code that makes requests to the backend
//
// these functions must be passed the dispatch from the current context

// export function loadCategories(setAllCategories) {
//   axios.get(`${BACKEND_URL}/listings`).then((result) => {
//     setAllCategories(result.data.categories);
//   });
// }

// get all the rooms to display to user
export function getRoomCatalogue(setRoomCatalogue) {
  return axios
    .get(`${BACKEND_URL}/rooms`, {withCredentials: true})
    .then(({data}) => {
      setRoomCatalogue(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
// get all users
export function getUsers(setLocalState) {
  return axios
    .get(`${BACKEND_URL}/users/findAll`, {withCredentials: true})
    .then(({data}) => {
      // convert each data's 'username' key to 'name' so tt it will work with the external lib
      for (let i = 0; i < data.length; i += 1) {
        data[i].name = data[i]['username'];
        delete data[i].username;
      }
      setLocalState(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
// get all the events tied to a given room
export function getAllEvents(setLocalState, roomId, dict) {
  return axios
    .get(`${BACKEND_URL}/bookings/bookingsBasedOnRoomId/${roomId}`, {
      withCredentials: true,
    })
    .then(({data}) => {
      // convert all dates to js dates, else it breaks the calendar
      data.map((elem) => {
        elem.bookingDate = new Date(elem.bookingDate);
        elem.startTime = new Date(elem.startTime);
        elem.endTime = new Date(elem.endTime);
      });
      setLocalState(data);

      data.forEach((singleEvent) => {
        const eventDate = moment(singleEvent.startTime).format('l');

        // if the key alr exists, push the singleEvent into the dictionary
        if (dict[`${eventDate}`] !== undefined) {
          dict[`${eventDate}`].push(singleEvent);
        }
        // if the key does not yet exist, create it and set the value to be an array containing the single event
        else {
          dict[`${eventDate}`] = [singleEvent];
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// save new meeting to the db
export function saveNewMeeting(history, meetingDetails) {
  return axios
    .post(`${BACKEND_URL}/bookings`, {meetingDetails}, {withCredentials: true})
    .then(({data}) => {
      history.push('/dashboard');
    })
    .catch((err) => {
      console.log(err);
    });
}
