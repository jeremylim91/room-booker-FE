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

export function loadListings(dispatch, setAllCategories, setBtnArray) {
  axios.get(`${BACKEND_URL}/listings`).then((result) => {
    // dispatch(loadListingsAction(result.data.listings));
    // dispatch(sortListingsByEndDateAction());
    // dispatch(sortAndFilterListingsByCreatedDate());
    // dispatch(loadCategoriesAction(result.data.categories));
    // dispatch(loadListingStatusesAction(result.data.listingStatus));
    // writeStorage('categories', result.data.categories);
    // writeStorage('listingStatus', result.data.listingStatus);
    // to do: for delivery modes also
    // To set all the categories in the buttons
    setAllCategories(result.data.categories);
    const allBtnsState = result.data.categories.map((_) => false);
    setBtnArray([true, ...allBtnsState]);
  });
}

export function selectListing(dispatch, listingId) {
  // console.log('selectListing ', listingId);
  return axios
    .get(`${BACKEND_URL}/listing/${listingId}`)
    .then((result) => {
      // console.log(result.data.selectedListing);
      // console.log('result.data.selectedListing', result.data.selectedListing);
      // dispatch(selectListingAction(result.data.selectedListing));
    })
    .catch((err) => {
      console.log(err);
    });
}

// export function findPurchaseCountPerListing(listingId, setProgressPercent) {
//   // console.log('findPurchaseCountPerListing listingId', listingId);
//   axios.get(`${BACKEND_URL}/purchases/count/${listingId}`).then((result) => {
//     setProgressPercent(result.data.purchaseCount);
//   });
// }

// export function getPurchaseCountPerListing(listingId) {
//   axios.get(`${BACKEND_URL}/purchases/count/${listingId}`).then((result) => (result.data.purchaseCount));
// }

// export function createListing(dispatch, listing) {
//   return axios.post(`${BACKEND_URL}/addlisting`, listing).then((result) => {
//     // dispatch(addListingAction());
//     // return result.data.listing.id;
//   });
// }

// export function updateListing(dispatch, updatedListingData, imageFormData) {
//   // Upload the edited data to db
//   return axios.post(`${BACKEND_URL}/listings/${updatedListingData.id}/update`,
//     { updatedListingData }).then((result) =>
//   {
//     console.log('update successfully: ', result.data.updatedListing.id);
//     // Upload added images
//     return axios.post(`${BACKEND_URL}/listings/${updatedListingData.id}/update/images`, imageFormData).then((resImageUpload) => {
//       console.log('update image successfully: ', resImageUpload.data.updatedListing.id);
//       // dispatch(selectListingAction(resImageUpload.data.updatedListing));
//       return resImageUpload.data.updatedListing.id;
//     })
//       .catch((err) => {
//         // dispatch(selectListingAction(result.data.updatedListing));
//         return result.data.updatedListing.id;
//       }); });
// }

// export function recordPurchase(dispatch, uploadedFile, listingPK, qtyOrdered) {
//   // If is use {uploadedFile and CurrItemPk, req.files becomes empty obj in my purchases controller}
//   return axios.post(`${BACKEND_URL}/recordPurchase/${listingPK}/${qtyOrdered}`, uploadedFile)
//     .then(() => {
//       // what to do after store the img?
//       console.log('image url has been saved to db successfully');
//     });
// }

// export function getAllPurchasesAssociatedWUser(userName) {
//   return axios.post(`${BACKEND_URL}/allPurchases`, { userName })
//     .then(({ data }) => data)
//     .catch((error) => {
//       console.log(error);
//       window.location = '/error';
//     });
// }
