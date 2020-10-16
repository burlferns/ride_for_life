/*
  The root reducer state slice looks like this:
  {
    userData: { ... },
    momData: { ... },
    driverData: { ... },
    uiData: { ... }
  }

  Where:
    -- userData is info about the user, whether it is a mom or driver.
    -- momData is info for a mom user.
    -- driverData is info for a driver.
    -- uiData is where data to make the user interface work is stored.
  See the respective slice reducers for the shape of the data


  In addtion when a user is logged in the following will be stored in
  localstorage: 
    -- authToken 
    -- userId

*/
import { combineReducers} from 'redux';
import userDataReducer from './userDataReducer.js';
import momDataReducer from './momDataReducer.js';
import driverDataReducer from './driverDataReducer.js';
import uiDataReducer from './uiDataReducer.js';

export const timeDelta = 5*60*1000; //This is the timeDelta used to check if the downloaded 
                                    //data is fresh enough

export default combineReducers(
  {
    userData: userDataReducer, 
    momData: momDataReducer,
    driverData: driverDataReducer,
    uiData: uiDataReducer
  }
)

/***********************************************************************
 The following are the actions for all reducers
 ***********************************************************************/
export function resetReducers() {
  return {
    type: 'resetReducers'
  }
}