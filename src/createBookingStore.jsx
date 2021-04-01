import React, {useReducer} from 'react';
import {writeStorage, useLocalStorage} from '@rehooks/local-storage';
import axios from 'axios';
import {BACKEND_URL} from './store.jsx';

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 * Modes of the Create Booking Form
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

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

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store

export const initialFormState = {
  roomId: '',
  meetingDate: '',
  startTime: null,
  endTime: null,
  agenda: '',
  attendees: false,
};

// Define each action to do on the data we defined above

// used to load list of rooms
const GET_ROOM_CATALOGUE = 'GET_ROOM_CATALOGUE';

// Used to load initial bookings and also to reload edited bookings

// define the matching reducer function
export function createBookingReducer(state, {field, value}) {
  return {
    ...state,
    [field]: value,
  };
}
export function getRoomCatalogueAction() {
  return {
    type: GET_ROOM_CATALOGUE,
  };
}
/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Provider Code
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

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
    console.log(`data returned to client from getRoomCatalogue() fn`);
    console.log(data);
    setRoomCatalogue(data);
  });
}
