import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import NavbarComponent from './components/NavbarComponent.jsx';
// import { GroupBuyProvider } from './store.jsx';

import HomePage from './components/HomePage/HomePage.jsx'

function App() {
  return (
    // <GroupBuyProvider>
      <Router>
        {/* <NavbarComponent /> */}
        <Switch>
          <Route exact path="/" component={HomePage} />
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
    // </GroupBuyProvider>
  );
}

export default App;
