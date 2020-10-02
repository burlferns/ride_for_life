import React from 'react';
import { Route, Switch } from "react-router-dom";

import HeaderNav from './components/Header_Nav/HeaderNav.js';
import SignIn from './components/GeneralPages/SignIn.js';
import Footer from './components/GeneralComponents/Footer.js';
import MomProfile from './components/MomPages/MomProfile.js';
import MomDriversList from './components/MomPages/MomDriversList.js';
import MomReviewsList from './components/MomPages/MomReviewsList.js';
import DriverProfile from './components/DriverPages/DriverProfile.js';
import DriverReviewsList from './components/DriverPages/DriverReviewsList.js';

function App() {
  return (
    <div className="App">
      <HeaderNav/>

      <Switch>
        <Route exact path='/' component={SignIn}/>
        <Route exact path='/mom/profile' component={MomProfile}/>
        <Route exact path='/mom/driversList' component={MomDriversList}/>
        <Route exact path='/mom/reviewsList' component={MomReviewsList}/>

        <Route exact path='/driver/profile' component={DriverProfile}/>
        <Route exact path='/driver/reviewsList' component={DriverReviewsList}/>


      </Switch>      

      <Footer/>
    </div>
  );
}

export default App;
