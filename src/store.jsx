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
  loggedInUsername: null,
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

// define the matching reducer function
export function roomBookerReducer(state, action) {
  let newListings;
  let currentListingIndex;

  switch (action.type) {
    case SET_USERNAME:
      return {...state, loggedInUsername: action.payload.username};
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

// In this section we extract out the
// code that makes requests to the backend
//
// these functions must be passed the dispatch from the current context

export function deleteUser(localState, setLocalState, userId) {
  axios
    .put(`${BACKEND_URL}/users/delete/${userId}`)
    .then(({data}) => {
      // remove user as a tag
      let newLocalState = {...localState};
      newLocalState.tags = [];
      setLocalState(newLocalState);
    })
    .catch((err) => {
      console.log(err);
    });
}
