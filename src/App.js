import React, {useEffect,useState} from 'react';
import {Route} from "react-router-dom";

import HeaderNav from './components/Header_Nav/HeaderNav.js';
import SignIn from './components/GeneralPages/SignIn.js';
import Footer from './components/GeneralComponents/Footer.js';
import MomProfile from './components/MomPages/MomProfile.js';
import MomDriversList from './components/MomPages/MomDriversList.js';
import MomReviewsList from './components/MomPages/MomReviewsList.js';
import DriverProfile from './components/DriverPages/DriverProfile.js';
import DriverReviewsList from './components/DriverPages/DriverReviewsList.js';
import DriverRegisterUpdateProfile from './components/DriverPages/DriverRegisterUpdateProfile.js';
import MomRegisterUpdateProfile from './components/MomPages/MomRegisterUpdateProfile.js';

import PublicRoute from './utils/PublicRoute.js';
import MomPrivateRoute from './utils/MomPrivateRoute.js';
import DriverPrivateRoute from './utils/DriverPrivateRoute.js';

//import Temp from './components/GeneralPages/Temp.js';

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

        <PublicRoute 
          routeAttributes={ {exact:true, path:'/'} }
          element={<SignIn/>}
        />
        <PublicRoute 
          routeAttributes={ {exact:true, path:'/mom/register'} }
          element={<MomRegisterUpdateProfile useForm='register'/>}
        />
        <PublicRoute 
          routeAttributes={ {exact:true, path:'/driver/register'} }
          element={<DriverRegisterUpdateProfile useForm='register'/>}
        />


        {/* Routes for mom only */}
        <MomPrivateRoute 
          routeAttributes={ {exact:true, path:'/mom/profile'} }
          element={<MomProfile/>}
        />  
        <MomPrivateRoute 
          routeAttributes={ {exact:true, path:'/mom/updateprofile'} }
          element={<MomRegisterUpdateProfile useForm='update'/>}
        />  
        <Route exact path='/mom/driversList' component={MomDriversList}/>
        <Route exact path='/mom/reviewsList' component={MomReviewsList}/>
        


        {/* Routes for drivers only */}
        <DriverPrivateRoute 
          routeAttributes={ {exact:true, path:'/driver/profile'} }
          element={<DriverProfile/>}
        />  
        <DriverPrivateRoute 
          routeAttributes={ {exact:true, path:'/driver/updateprofile'} }
          element={<DriverRegisterUpdateProfile useForm='update'/>}
        />  
        <Route exact path='/driver/reviewsList' component={DriverReviewsList}/>
        

        <Footer/>
      </div>
    </ViewportContext.Provider>
    
  );
}

export default App;
