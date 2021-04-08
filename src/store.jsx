import React, {useReducer} from 'react';
import axios from 'axios';
// import { writeStorage, useLocalStorage, deleteFromStorage } from '@rehooks/local-storage';

export const BACKEND_URL = 'http://localhost:3004';

// export const LISTING_VIEW_MODES = {
//   BUYER_LISTING_VIEW: 'BUYER_LISTING_VIEW',
//   LISTER_LISTING_VIEW: 'LISTER_LISTING_VIEW',
//   DEFAULT_LISTING_VIEW: 'DEFAULT_LISTING_VIEW',
// };

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store
export const initialState = {
  loggedInUserName: null,
  loggedInEmail: null,
  loggedInUserId: null,
  allUpcomingMeetings: [],
  allMtgsForCurrUser: [],
  detailsOfNewMeeting: [],
};

// just like the todo app, define each action we want to do on the
// data we defined above
const LOAD_UPCOMING_MEETINGS = 'LOAD_UPCOMING_MEETINGS';
const LOAD_CURR_USER_MEETINGS = 'LOAD_CURR_USER_MEETINGS';
const CREATE_NEW_MEETING = 'CREATE_NEW_MEETING';

// Used for tracking currUsername and currUserId
const SET_USERNAME = 'SET_USERNAME';
const SET_USERID = 'SET_USERID';
const SET_EMAIL = 'SET_EMAIL';

export const dashboardFilters = {
  ALL_MEETINGS: 'All Meetings',
  MY_MEETINGS: 'My Meetings',

  ANY: 'All resources',
  ONYX: 'Onyx',
  PARK: 'Park',
  HALO: 'Halo',
};

// define the matching reducer function
export function roomBookerReducer(state, action) {
  switch (action.type) {
    case SET_USERNAME:
      return {...state, loggedInUsername: action.payload.username};
    case SET_EMAIL:
      return {...state, loggedInEmail: action.payload.email};
    case SET_USERID:
      return {...state, loggedInUserId: action.payload.userId};
    default:
      return state;
  }
}

// The following action-generating functions are commonly referred to
// as "action creators". They accept any input relevant to the action,
// and return an object that represents that action, which is typically
// passed to the dispatch function. Actions always contain a type attribute
// used to identify the action and tell the reducer what logic to run.

export function setLoggedInEmail(email) {
  return {
    type: SET_EMAIL,
    payload: {
      email,
    },
  };
}
export function setLoggedInUsername(username) {
  return {
    type: SET_USERNAME,
    payload: {
      username,
    },
  };
}

export function setLoggedInUserId(userId) {
  return {
    type: SET_USERID,
    payload: {
      userId,
    },
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

export const RoomBookerContext = React.createContext(null);
const {Provider} = RoomBookerContext;

// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function RoomBookerProvider({children}) {
  const [store, dispatch] = useReducer(roomBookerReducer, initialState);
  return <Provider value={{store, dispatch}}>{children}</Provider>;
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

const Axios = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

// In this section we extract out the
// code that makes requests to the backend
//
// these functions must be passed the dispatch from the current context

// delete a user by switching isDeleted to True;
// Note: It was a deliberate decision to use "isDeleted" as a flag, instead of wiping the user's data from the DB
// this was done to retain user data that could come in useful for future analysis
export function deleteUser(usersToDelete, setTaggedUsers) {
  return axios
    .put(
      `${BACKEND_URL}/users/delete`,
      {usersToDelete},
      {withCredentials: true}
    )
    .then(({data}) => {
      // remove user as a tag
      setTaggedUsers([]);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Create a new user by saving his/her details to the db
export function createUser(localState, handleClose) {
  return axios
    .post(`${BACKEND_URL}/users/create`, {localState}, {withCredentials: true})
    .then(({data}) => {
      alert('New user created successfully!');
      handleClose();
    })
    .catch((err) => {
      console.log(err);
    });
}

// check if inputted credentials match our db records, create user session if so
export function validateUserSignIn(signInData, dispatch) {
  axios
    .put(`${BACKEND_URL}/signIn`, signInData, {withCredentials: true})
    .then(({data}) => {
      console.log(`data.user.email returned from /signin fn `);
      console.log(data.user.email);
      // reset the username and password fields
      // setUsernameInput('');
      // setPasswordInput('');
      // if (data.auth) {
      dispatch(setLoggedInEmail(data.user.email));
      dispatch(setLoggedInUsername(data.user.username));
      dispatch(setLoggedInUserId(data.user.id));
    })
    .catch((error) => console.log(error));
}

// get all meetings that are associated w/ the user (this shld include user-booke AND user-tagged)
export function getAllEventsByUserId(setAllEventsByUserId) {
  return axios
    .get(`${BACKEND_URL}/bookings/bookingsByUserId`, {
      withCredentials: true,
    })
    .then(({data}) => {
      // convert all dates to js dates, else it breaks the calendar
      Object.keys(data).forEach((key) =>
        data[`${key}`].forEach((elem) => {
          elem.bookingDate = new Date(elem.bookingDate);
          elem.startTime = new Date(elem.startTime);
          elem.endTime = new Date(elem.endTime);
        })
      );
      console.log(`all meetings associated with user is:`);
      console.log(data);
      setAllEventsByUserId(data);
    })
    .catch((error) => console.log(error));
}
// export function getAllEventsByUserId(setAllEventsByUserId) {
//   return axios
//     .get(`${BACKEND_URL}/bookings/bookingsByUserId`, {
//       withCredentials: true,
//     })
//     .then(({data}) => {
//       // convert all dates to js dates, else it breaks the calendar
//       Object.keys(data).forEach((key) =>
//         data[`${key}`].forEach((elem) => {
//           elem.bookingDate = new Date(elem.bookingDate);
//           elem.startTime = new Date(elem.startTime);
//           elem.endTime = new Date(elem.endTime);
//         })
//       );
//       console.log(`all meetings associated with user is:`);
//       console.log(data);
//       setAllEventsByUserId(data);
//     })
//     .catch((error) => console.log(error));
// }
// get all attendees of a specified meeting
export async function getCalendarEventsDisplay(setCalendarEventDisplay) {
  try {
    let [getAllMeetings, getUserMeetings] = await Promise.all([
      Axios.get('/bookings/all'),
      Axios.get('/bookings/bookingsByUserId'),
    ]);

    // remove duplicates between userTaggedMtgs and userBookedMtgs
    console.log(`getAllMeetings in store:`);
    console.log(getAllMeetings);
    console.log('getUserMeetings in store');
    console.log(getUserMeetings);
    const makeListOfUniqueMtgs = (list1, list2) => {
      const nonUniqueListOfMtgs = [...list1, ...list2];
      const result = [];
      const map = new Map();
      for (const meeting of nonUniqueListOfMtgs) {
        if (!map.has(meeting.id)) {
          map.set(meeting.id, meeting.id); // set any value to Map
          result.push({
            id: meeting.id,
            agenda: meeting.agenda,
            startTime: meeting.startTime,
            endTime: meeting.endTime,
            roomId: meeting.roomId,
            userId: meeting.userId ? meeting.userId : null,
          });
        }
      }
      return result;
    };
    const userMeetings = makeListOfUniqueMtgs(
      getUserMeetings.data.userBookedMeetings,
      getUserMeetings.data.userTaggedMeetings
    );
    const allMeetings = getAllMeetings.data;
    setCalendarEventDisplay({
      userMeetings,
      allMeetings,
    });
  } catch (err) {
    console.log(err);
  }
}

// query the db to get list of mtg attendees acc to a booking id.
export function getAllAttendeesByBookingId(setMtgAttendees, bookingId) {
  console.log(`bookingId in 'store'`);
  console.log(bookingId);
  return axios
    .get(`${BACKEND_URL}/bookings/mtgAttendees/${bookingId}`, {
      withCredentials: true,
    })
    .then(({data}) => {
      // convert each data's 'username' key to 'name' so tt it will work with the external lib
      for (let i = 0; i < data.length; i += 1) {
        data[i].name = data[i]['username'];
        delete data[i].username;
      }
      console.log(`data in store:`);
      console.log(data);

      setMtgAttendees(data);
    })
    .catch((error) => console.log(error));
}
// Updte the db to change a booking's isDeleted field to false
export function deleteABooking(setMtgIsDeleted, bookingId) {
  return Axios.put('/bookings/deleteABooking', {bookingId})
    .then(({data}) => {
      if (data === 'disallow') alert('Unauthorised action');
      setMtgIsDeleted(true);
      window.location = '/dashboard';
    })
    .catch((error) => console.log(error));
}
// update DB with new info about bookings (made via dashboard component)
export function updateBooking(newBookingInfo) {
  console.log(`inside updateBookings in store`);

  return (
    Axios.put('/bookings/updateBooking', newBookingInfo)
      // return axios
      //   .put('/bookings/updateBooking', {newBookingInfo}, {withCredentials: true})
      .then(({data}) => {
        if (data === 'disallow') alert('Unauthorised action');
      })
      .catch((error) => console.log(error))
  );
}
