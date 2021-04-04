import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Nav, DropdownButton, Dropdown} from 'react-bootstrap';
import axios from 'axios';
import {
  BACKEND_URL,
  RoomBookerContext,
  setLoggedInEmail,
} from '../../store.jsx';

export default function UsernameBtn({collapseNavBar}) {
  const {store, dispatch} = useContext(RoomBookerContext);

  const handleSignOut = () => {
    collapseNavBar();
    axios
      .put(`${BACKEND_URL}/signOut`, {}, {withCredentials: true})
      .then(() => {
        window.location = '/';
        dispatch(setLoggedInEmail(null));
      })
      .catch((err) => console.log(err));
  };
  return (
    <Nav.Link>
      <DropdownButton
        id="dropdown-basic-button"
        key="left"
        drop="left"
        title={store.loggedInUsername}>
        {/* <Dropdown.Item as={Link} to="/createListing" onClick={collapseNavBar}>
          Add New Listing
        </Dropdown.Item>

        <Dropdown.Item as={Link} to="/MyListings" onClick={collapseNavBar}>
          My Listings
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/MyPurchases" onClick={collapseNavBar}>
          My Purchases
        </Dropdown.Item>
        <Dropdown.Divider /> */}
        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
      </DropdownButton>
    </Nav.Link>
  );
}
