import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent.jsx';
import {RoomBookerProvider} from './store.jsx';

import HomePage from './components/HomePage/HomePage.jsx';
import CreateBookingMain from './components/CreateBookingMultistepForm/CreateBookingMain.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import {CreateBookingContext} from './createBookingStore';
import ManageUsers from './components/ManageUsers/ManageUsers';
import NotSignedInErrorPage from './components/SignInAndRegistration/NotSignedInErrorPage.jsx';

function App() {
  return (
    <RoomBookerProvider>
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/createBooking" component={CreateBookingMain} />
          <Route path="/manageUsers" component={ManageUsers} />
          <Route path="/dashboard" component={Dashboard} />
          {/* Routes that require cookies/authentication to access */}

          <Route path="/error" component={NotSignedInErrorPage} />
        </Switch>
      </Router>
    </RoomBookerProvider>
  );
}

export default App;
