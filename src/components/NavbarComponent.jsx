import React, {useState, useContext, useEffect} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import SignInModal from './SignInAndRegistration/SignInModal.jsx';
import {
  RoomBookerContext,
  setLoggedInEmail,
  setLoggedInUserId,
} from '../store.jsx';
import UsernameBtn from './SignInAndRegistration/UsernameBtn.jsx';
import {
  getUsernameFromCookie,
  getUserIdFromCookie,
} from '../utils/cookieRelatedFns.mjs';

export default function NavbarComponent() {
  const {store, dispatch} = useContext(RoomBookerContext);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const currUsername = getUsernameFromCookie();
    const currUserId = getUserIdFromCookie();

    if (currUsername) {
      dispatch(setLoggedInEmail(currUsername));
      dispatch(setLoggedInUserId(currUserId));
    }
  }, []);

  const collapseNavBar = () => {
    setExpanded(false);
  };

  return (
    <>
      <Navbar expanded={expanded} bg="light" expand="lg">
        <LinkContainer exact to="/">
          <Navbar.Brand>
            {/* <img src="groupbuy_icon3.svg" alt="img" width="80px" /> */}
            <div className="Room Booker-brand">Room Booker </div>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : 'expanded')}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/manageUsers" onClick={collapseNavBar}>
              <Nav.Link>Manage Users</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard" onClick={collapseNavBar}>
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="/payment">
              <Nav.Link>[test] payment</Nav.Link>
            </LinkContainer> */}
            {/* <LinkContainer to="/MyProfile" onClick={collapseNavBar}>
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer> */}
          </Nav>
          <Nav className="ml-auto">
            {store.loggedInEmail ? (
              <UsernameBtn collapseNavBar={collapseNavBar} />
            ) : (
              <SignInModal collapseNavBar={collapseNavBar} />
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
