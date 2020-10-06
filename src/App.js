import React, {useEffect,useState} from 'react';
import { Route, Switch } from "react-router-dom";

import HeaderNav from './components/Header_Nav/HeaderNav.js';
import SignIn from './components/GeneralPages/SignIn.js';
import Footer from './components/GeneralComponents/Footer.js';
import MomProfile from './components/MomPages/MomProfile.js';
import MomDriversList from './components/MomPages/MomDriversList.js';
import MomReviewsList from './components/MomPages/MomReviewsList.js';
import DriverProfile from './components/DriverPages/DriverProfile.js';
import DriverReviewsList from './components/DriverPages/DriverReviewsList.js';

import DriverRegisterProfile from './components/DriverPages/DriverRegisterProfile.js';
import MomRegisterUpdateProfile from './components/MomPages/MomRegisterUpdateProfile.js';


import Temp from './components/GeneralPages/Temp.js';

export const ViewportContext = React.createContext([]);

const hfs = 10; //This is the font-size set on the html element in px

function App() {
  const [vpSize,setVpSize] = useState([
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
    hfs
  ]);
  
  useEffect(() => {
    const handleWindowResize = () => setVpSize([
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
      hfs
    ]);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  

  return (
    <ViewportContext.Provider value={vpSize}>
      <div className="App">
        <HeaderNav/>

        <Switch>
          <Route exact path='/1' component={SignIn}/>
          <Route exact path='/mom/profile' component={MomProfile}/>
          <Route exact path='/mom/driversList' component={MomDriversList}/>
          <Route exact path='/mom/reviewsList' component={MomReviewsList}/>

          <Route exact path='/driver/profile' component={DriverProfile}/>
          <Route exact path='/driver/reviewsList' component={DriverReviewsList}/>

          <Route exact path='/2' component={DriverRegisterProfile}/>

          <Route exact path='/mr'>
            <MomRegisterUpdateProfile useForm='register'/>
          </Route>

          <Route exact path='/mu'>
            <MomRegisterUpdateProfile useForm='update'/>
          </Route>

        </Switch>      

        <Footer/>
      </div>
    </ViewportContext.Provider>
    
  );
}

export default App;
