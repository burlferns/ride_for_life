import React, {useEffect,useState} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import HeaderNav from './components/Header_Nav/HeaderNav.js';
import SignIn from './components/GeneralPages/SignIn.js';
import Footer from './components/GeneralComponents/Footer.js';
import MomPage from './components/MomPages/MomPage.js';
import DriverPage from './components/DriverPages/DriverPage.js';
import DriverRegisterUpdateProfile from './components/DriverPages/DriverRegisterUpdateProfile.js';
import MomRegisterUpdateProfile from './components/MomPages/MomRegisterUpdateProfile.js';

import PublicRoute from './utils/PublicRoute.js';
import MomPrivateRoute from './utils/MomPrivateRoute.js';
import DriverPrivateRoute from './utils/DriverPrivateRoute.js';

// import Temp from './components/GeneralPages/Temp.js';

export const ViewportContext = React.createContext([]);

const hfs = 10; //This is the font-size set on the html element in px

let timeOutId;

export default function App() {
  const [vpSize,setVpSize] = useState([
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
    hfs
  ]);
  
  useEffect(() => {
    const handleWindowResize = () => {
      if(timeOutId) {
        clearTimeout(timeOutId);
      }

      timeOutId = setTimeout(()=>{
        setVpSize([      
          document.documentElement.clientWidth,
          document.documentElement.clientHeight,
          hfs
        ])
        // console.log('setState event');
      },15)      

      // console.log('resize event');
    };
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  
  return (
    <ViewportContext.Provider value={vpSize}>
      <div className="App">
        <HeaderNav/>
          <Switch>  {/* Note that the Switch component can only have Route and Redirect 
                      as its children.  It cannot have a custom component as its child */}


            {/* This is temp path used just while mom page development is ongoing */}
            <Route path='/mom'>
              <MomPage/>
              {/* <Temp/> */}
            </Route>



            {/* These are public routes */}
            <Route exact path='/'>
              <PublicRoute elemToRndr={<SignIn/>}/>
            </Route>
            
            <Route exact path='/mom/register'>
              <PublicRoute 
                elemToRndr={<MomRegisterUpdateProfile useForm='register'/>}
              />
            </Route>
            
            <Route exact path='/driver/register'>
              <PublicRoute 
                elemToRndr={<DriverRegisterUpdateProfile useForm='register'/>}
              />
            </Route>




            {/* These are private mom routes */}
            <Route exact path='/mom/updateprofile'>
              <MomPrivateRoute 
                elemToRndr={<MomRegisterUpdateProfile useForm='update'/>}
              />
            </Route>

            <Route path='/mom'>  {/* Exact not used because this is nested */}
              {/* The nested routes are:
                  /mom/profile
                  /mom/driversList
                  /mom/reviewsList */}
              <MomPrivateRoute elemToRndr={<MomPage/>}/>
            </Route>





            {/* These are private driver routes */}
            <Route exact path='/driver/updateprofile'>
              <DriverPrivateRoute 
                elemToRndr={<DriverRegisterUpdateProfile useForm='update'/>}
              />
            </Route>

            <Route path='/driver'>  {/* Exact not used because this is nested */}
              {/* The nested routes are:
                  /driver/profile
                  /driver/reviewsList */}
              <DriverPrivateRoute elemToRndr={<DriverPage/>}/>
            </Route>




            {/* For any other path, default redirect */}
            <Redirect to="/" />       

          </Switch>
        <Footer/>
      </div>
    </ViewportContext.Provider>    
  );
}