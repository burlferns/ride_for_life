import React, {useEffect,useState} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import HeaderNav from './components/Header_Nav/HeaderNav.js';
import SignIn from './components/GeneralPages/SignIn.js';
import Footer from './components/GeneralComponents/Footer.js';
import MomPage from './components/MomPages/MomPage.js';
import MomDriversList from './components/MomPages/MomDriversList.js';
import MomReviewsList from './components/MomPages/MomReviewsList.js';
import DriverProfile from './components/DriverPages/DriverProfile.js';
import DriverReviewsList from './components/DriverPages/DriverReviewsList.js';
import DriverRegisterUpdateProfile from './components/DriverPages/DriverRegisterUpdateProfile.js';
import MomRegisterUpdateProfile from './components/MomPages/MomRegisterUpdateProfile.js';

import PublicRoute from './utils/PublicRoute.js';
import MomPrivateRoute from './utils/MomPrivateRoute.js';
import DriverPrivateRoute from './utils/DriverPrivateRoute.js';

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
          <Switch>  {/* Note that the Switch component can only have Route and Redirect 
                      as its children.  It cannot have a custom component as its child */}

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




            {/* These are private driver routes */}
            <Route exact path='/driver/profile'>
              <DriverPrivateRoute elemToRndr={<DriverProfile/>}/>
            </Route>

            <Route exact path='/driver/updateprofile'>
              <DriverPrivateRoute 
                elemToRndr={<DriverRegisterUpdateProfile useForm='update'/>}
              />
            </Route>

            <Route exact path='/driver/reviewsList'>
              <DriverPrivateRoute 
                elemToRndr={<DriverReviewsList/>}
              />
            </Route>



            {/* These are private mom routes */}
            <Route path='/mom'>
              <MomPrivateRoute elemToRndr={<MomPage/>}/>
            </Route>




            {/* For any other path, default redirect */}
            <Redirect to="/" />          



          {/* <PublicRoute 
            exact={true} path='/'
            // routeAttributes={ {exact:true, path:'/'} }
            element={<SignIn/>}
          />
          <PublicRoute 
            exact={true} path='/mom/register'
            // routeAttributes={ {exact:true, path:'/mom/register'} }
            element={<MomRegisterUpdateProfile useForm='register'/>}
          />
          <PublicRoute 
            exact={true} path='/driver/register'
            // routeAttributes={ {exact:true, path:'/driver/register'} }
            element={<DriverRegisterUpdateProfile useForm='register'/>}
          /> */}


          {/* Routes for mom only */}
          {/* <MomPrivateRoute 
            routeAttributes={ {exact:true, path:'/mom/updateprofile'} }
            element={<MomRegisterUpdateProfile useForm='update'/>}
          /> 
          <MomPrivateRoute 
            routeAttributes={ {exact:false, path:'/mom'} }
            element={<MomPage/>}
          />  
          <Route exact path='/mom/driversList' component={MomDriversList}/>
          <Route exact path='/mom/reviewsList' component={MomReviewsList}/> */}
          


          {/* Routes for drivers only */}
          {/* <DriverPrivateRoute 
            routeAttributes={ {exact:true, path:'/driver/profile'} }
            element={<DriverProfile/>}
          />  
          <DriverPrivateRoute 
            routeAttributes={ {exact:true, path:'/driver/updateprofile'} }
            element={<DriverRegisterUpdateProfile useForm='update'/>}
          />  
          <Route exact path='/driver/reviewsList' component={DriverReviewsList}/> */}
          

          {/* <Route exact path='/' component={MomPage}/> */}
        
          </Switch>
        <Footer/>
      </div>
    </ViewportContext.Provider>
    
  );
}

export default App;
