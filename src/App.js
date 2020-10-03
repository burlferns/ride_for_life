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

export const ViewportContext = React.createContext([]);

function App() {
  const [vpSize,setVpSize] = useState([
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  ]);
  
  useEffect(() => {
    const handleWindowResize = () => setVpSize([
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
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
          <Route exact path='/' component={SignIn}/>
          <Route exact path='/mom/profile' component={MomProfile}/>
          <Route exact path='/mom/driversList' component={MomDriversList}/>
          <Route exact path='/mom/reviewsList' component={MomReviewsList}/>

          <Route exact path='/driver/profile' component={DriverProfile}/>
          <Route exact path='/driver/reviewsList' component={DriverReviewsList}/>
        </Switch>      

        <Footer/>
      </div>
    </ViewportContext.Provider>
    
  );
}

export default App;
