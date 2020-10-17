/*
  
  This is state.momData in momDatareducer.js

  The momData reducer state slice looks like this:

  {
    drivers: {
      lastDwnldTime :  This is the last time that the drivers array was downloaded from the
                       backend server as the output of Date.now(). The array of drivers will
                       only be downloaded from the backend server if it is needed and if more
                       than timeDelta milliseconds have passed since the data was last
                       downloaded. The const timeDelta is defined in the rootReducer.
                       
      driverArray : []  This is an array of all drivers downloaded from the backend.
    }

    driverReviews: {
        The driverReviews object will store the all the driver reviews for a particular driver 
        using the driver's id as the property key. Three examples are shown below, but there can
        be from 0 to an indefinite amount dependant on computer resources.
        The driverId-3 shows the contents of the property value.

      driverId-1: {
          . . .
      },

      driverId-2: {
          . . .
      },

      driverId-3: {
        reviews : []  This is an array of reviews for the driver downloaded from the backend
                      server

        lastDwnldTime: This is the last time that the reviews array for this particular driver was
                       downloaded from the backend server as the output of Date.now(). The array
                       of reviews will only be downloaded from the backend server if it is needed
                       and if more than timeDelta milliseconds have passed since the data was
                       last downloaded. The const timeDelta is defined in the rootReducer.

        avgRating: This is a float number that is the average of all the ratings for the driver
                   calculated when the array of reviews is downloaded
      }

    }
  }


*/

import {timeDelta} from './rootReducer.js';
import {axiosWithAuth} from '../utils/axiosConfig.js';


const reducerInitialState = { };

export default function(state=reducerInitialState, action) {
  switch(action.type) {
    case 'resetReducers': {
      return reducerInitialState
    }

    case 'momData/saveDriversList': {
      const newState = {...state};
      newState.drivers = {
        driverArray: action.payload.driverArray,
        lastDwnldTime: action.payload.timeNow
      }
      return newState;
    }


    default:
      return state;
  }
}

/***********************************************************************
 The following are the actions for this reducer only
************************************************************************/
function saveDriversList(driverArray,timeNow) {
  return {
    type: 'momData/saveDriversList',
    payload: {driverArray,timeNow}
  }
}

export function downloadDriverArray() {
  return async function(dispatch, getState) {
    const drivers = getState().momData.drivers;
    let timeNow = Date.now();
    let response;

    try {
      //If there is no drivers data or it was last downloaded over timeDelta
      //milliseconds ago, then download fresh driver data
      if(drivers===undefined || (timeNow - drivers.lastDwnldTime>timeDelta)){
        response = await axiosWithAuth().get(`/api/drivers`);
        timeNow = Date.now();
        dispatch(saveDriversList(response.data,timeNow));
      }
      return Promise.resolve();
    }
    catch(error) {
      console.log('momDatareducer.js/downloadDriverArray error :', error.response)
    }    
  }
}
