import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent.jsx';
import {RoomBookerProvider} from './store.jsx';

import HomePage from './components/HomePage/HomePage.jsx';
import CreateBookingMain from './components/CreateBookingMultistepForm/CreateBookingMain.jsx';
import {CreateBookingContext} from './createBookingStore';

function App() {
  return (
    <RoomBookerProvider>
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/createBooking" component={CreateBookingMain} />
          {/* <Route path="/listingdetails/:listingId" component={ViewListing} /> */}
          {/* <Route path="/viewAllListings" component={ViewAllListings} /> */}
          {/* Routes that require cookies/authentication to access */}
          {/* <Route path="/payment" component={MainPaymentPage} />
          <Route path="/createListing" component={CreateListingForm} />
          <Route path="/MyListings" component={MyListings} />
          <Route path="/MyPurchases" component={MainMyPurchasesPage} />
          <Route path="/viewProgress/:listingId/" component={CampaignProgress} />
          <Route path="/editListing/:listingId" component={EditListing} />
          <Route path="/delete/:listingId/" component={HomePage} /> */}
          {/* <Route path="/error" component={NotSignedInErrorPage} /> */}
        </Switch>
      </Router>
    </RoomBookerProvider>
  );
}

export default App;
