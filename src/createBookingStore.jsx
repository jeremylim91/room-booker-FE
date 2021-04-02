import React, {useReducer} from 'react';
import {writeStorage, useLocalStorage} from '@rehooks/local-storage';
import axios from 'axios';
import {BACKEND_URL} from './store.jsx';

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
  agenda: '',
  attendees: null,
  meetingDate: '',
};

/* ********************************
 * ********************************
 * ACTIONS
 * ********************************
 * *********************************/

// Define each action to do on the data defined in the initial state

// used to load list of rooms
// const GET_ROOM_CATALOGUE = 'GET_ROOM_CATALOGUE';

// save the user-selected room's id to the state
export const UPDATE_SELECTED_ROOM = 'UPDATE_SELECTED_ROOM';

// add a new mtg to the calendar
const CREATE_NEW_MEETING = 'CREATE_NEW_MEETING';

// used to handle changes to text input in forms
export const HANDLE_FORM_TEXT = 'HANDLE_FORM_TEXT';

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
      console.log({...state});
      return {...state};
    default:
      return null;
  }
}
// export function createBookingReducer(state, {field, value}) {
//   return {
//     ...state,
//     [field]: value,
//   };
// }

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
export function updateSelectedRoom(roomId) {
  console.log(`roomId in action-generator (shld be int)`);
  console.log(roomId);
  return {
    type: UPDATE_SELECTED_ROOM,
    payload: {
      roomId,
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

  const handleOnChange = (e) => {
    dispatchBookingForm({field: e.target.name, value: e.target.value});
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
  axios.get(`${BACKEND_URL}/rooms`).then(({data}) => {
    setRoomCatalogue(data);
  });
}
export function getAllEvents(setAllEvents, roomId) {
  console.log('about to get all events relating to room');
  axios.get(`${BACKEND_URL}/bookings/${roomId}`).then(({data}) => {
    // convert all dates to js dates, else it breaks the calendar
    data.map((elem) => {
      elem.bookingDate = new Date(elem.bookingDate);
      elem.startTime = new Date(elem.startTime);
      elem.endTime = new Date(elem.endTime);
    });
    console.log(`data returned to client from getAllEvents() fn`);
    console.log(data);
    setAllEvents(data);
  });
}
