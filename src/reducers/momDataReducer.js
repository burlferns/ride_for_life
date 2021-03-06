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

        reviewStatus: 'add' if logged-in mom does not already have a review for driver
                      'update' if logged-in mom already has a review for driver
      }

    }
  }


*/

import {timeDelta} from './rootReducer.js';
import {axiosWithAuth} from '../utils/axiosConfig.js';


const reducerInitialState = { };

/***********************************************************************
 The following is the reducer function
************************************************************************/
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

    case 'momData/saveDriversReview': {
      const newState = {...state};
      const driverId = action.payload.driverId;
      if(newState.driverReviews===undefined) {
        newState.driverReviews = {};        
      }
      newState.driverReviews[driverId] = {
        reviews: action.payload.reviewArray,
        lastDwnldTime: action.payload.timeNow,
        avgRating: action.payload.reviewAvg,
        reviewStatus: action.payload.reviewStatus
      }
      return newState;
    }
   
    case 'momData/deleteDriversReview': {
      if(state.driverReviews!==undefined && state.driverReviews[action.payload]!==undefined) {
        const newState = {...state};
        delete newState.driverReviews[action.payload];
        return newState;
      }
      else {
        return state;
      }
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

function saveDriversReview(driverId,reviewArray,reviewAvg,timeNow,reviewStatus) {
  return {
    type: 'momData/saveDriversReview',
    payload: {driverId,reviewArray,reviewAvg,timeNow,reviewStatus}
  }
}

export function deleteDriversReview(driverId) {
  return {
    type: 'momData/deleteDriversReview',
    payload: driverId
  }
}

export function downloadDriverArray() {
  return async function(dispatch, getState) {
    const drivers = getState().momData.drivers;
    let timeNow = Date.now();
    let response;

    //If there is no drivers data or it was last downloaded over timeDelta
    //milliseconds ago, then download fresh driver data
    if(drivers===undefined || (timeNow - drivers.lastDwnldTime > timeDelta)) {
      response = await axiosWithAuth().get(`/api/drivers`);
      timeNow = Date.now();
      dispatch(saveDriversList(response.data,timeNow));
    } 
    return getState().momData.drivers;  
  }
}

export function downloadDriverReviews(driverId) {
  return async function(dispatch, getState) { 
    const driverReviews = getState().momData.driverReviews;
    let timeNow = Date.now();
    let response;

    //If there is no driver review data for the particular driver, or it was last
    //downloaded over timeDelta milliseconds ago, then download fresh data
    if( driverReviews===undefined || 
      driverReviews[driverId]===undefined ||
      (timeNow - driverReviews[driverId].lastDwnldTime > timeDelta) 
    ) {
      response = await axiosWithAuth().get(`/api/drivers/${driverId}/reviews`);
      

      //Calculate the average rating for driver
      timeNow = Date.now();
      const reviewArray = response.data;
      const reviewSum = reviewArray.reduce((acc,curr)=>acc+curr.rating,0);
      const reviewAvg = (reviewSum/(reviewArray.length)).toFixed(1);


      //Determine if mom already has a review for driver
      let reviewStatus = 'add';
      const found = reviewArray.find(elem=>
        parseInt(elem.user_id)===parseInt(localStorage.getItem('userId'))
      );
      if(found!==undefined) {
        reviewStatus = 'update';
      }


      dispatch(saveDriversReview(driverId,reviewArray,reviewAvg,timeNow,reviewStatus));
    }
  }
}
