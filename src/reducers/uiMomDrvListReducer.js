/*

  This is state.uiData.uiMomDrvList  in uiMomDrvListReducer.js

  The uiMomDrvList reducer state slice looks like this:

  If no search is selected or search is reset:
  {
    searchType: ''
  }

  If the search type is "Driver's name":
  {
    searchType: "Driver's name",
    driverId: '' is initial value
              'none' for when a driver is not found with the name
              'int' for when a driver is found and his id is an integer int
    driverData: this is the data to display. It is an empty object, or filled 
                with key/value pairs of driver data
  }


  If the search type is "Plot location range":
  {
    searchType: "Plot location range",
    drvsInLoca: [] i.e. empty array for when no drivers in location range is found
               [...] i.e. filled array when drivers are found 
    driverId: '' for when no driver details is requested
              'int' for when a driver details is requested
    driverData: this is the driver details to display.
    sortType: 'Rating' is initial value and it is sort by rating
              'Price' for sort by price 
    error: false is initial value but can be set to true if location inputs are 
           not integer numbers or upper range value is less than lower range 
           value. Upper equals lower is fine 
  }




  
  }

*/

import {downloadDriverReviews} from './momDataReducer.js';

const reducerInitialState = { 
  searchType: ''
};

/***********************************************************************
 The following is the reducer function
************************************************************************/
export default function(state=reducerInitialState, action) {
  switch(action.type) {
    
    /************************* 
     * These are for general 
     * ***********************/
    case 'resetReducers': {
      return reducerInitialState;
    }
    case 'uiData/MomDrvList/resetST': {
      return reducerInitialState;
    }


    /********************************** 
     * These are for serching by name 
     * *********************************/
    case 'uiData/MomDrvList/setSTName': {
      return {
        searchType: "Driver's name",
        driverId: '',
        driverData: {}
      }
    }

    case 'uiData/MomDrvList/setSTName_None': {
      return {
        searchType: "Driver's name",
        driverId: 'none',
        driverData: {}
      }
    }
    
    case 'uiData/MomDrvList/setSTName_Found': {
      return {
        searchType: "Driver's name",
        driverId: `${action.payload.id}`,
        driverData: action.payload
      }
    }


    /************************************* 
     * These are for serching by location 
     * ***********************************/
    case 'uiData/MomDrvList/setSTLoca': {
      return {
        searchType: "Plot location range",
        drvsInLoca: [],
        driverId: '',
        driverData: {},
        sortType: 'Rating',
        error: false
      }
    }

    case 'uiData/MomDrvList/setSTLoca_setSort': {
      const newState = {...state, sortType:action.payload}
      return newState;
    }

    case 'uiData/MomDrvList/setSTLoca_setError' : {
      const newState = {...state, error:action.payload}
      return newState;
    }


    default:
      return state;
  }
}

/***********************************************************************
 The following are the general actions for this reducer only
************************************************************************/
//This resets the search type if the Drop Down Menu used to choose the 
//the type of search is reset to its initial state of nothing choosen 
function resetST() {
  return {
    type: 'uiData/MomDrvList/resetST'
  }
}

//Chooses the appropriate initial search state based on what search type
//is choosen. Can also reset the search state.
export function setSearchType(theType) {
  return function(dispatch) {
    switch(theType) {
      case '': {
        dispatch(resetST());
        return;
      }

      case "Driver's name": {
        dispatch(setSTName());
        return;
      }

      case "Plot location range": {
        dispatch(setSTLoca());
        return;
      }

      default:
        return;
    }
  }
}

/***********************************************************************
 The following are the actions for this reducer only for searching by
 driver's name 
************************************************************************/
//Initializes state to search by driver's name
function setSTName() {
  return {
    type: 'uiData/MomDrvList/setSTName'
  }
}

//Sets state if after a search the name is not found
function setSTName_None() {
  return {
    type: 'uiData/MomDrvList/setSTName_None'
  }
}

//Sets state if after a search the name is found
function setSTName_Found(data) {
  return {
    type: 'uiData/MomDrvList/setSTName_Found',
    payload: data
  }
}



//Perform the name search
export function doNameSearch(name) {
  return async function(dispatch, getState) {
    const driverArray = getState().momData.drivers.driverArray;
    const found = driverArray.find(elem=>elem.drivers_name===name);
    if(found===undefined) {
      dispatch(setSTName_None());
      return;
    }
    const dataToSave = {...found};
    delete dataToSave.password;

    //Now make sure that the latest reviews for the found driver
    //are at state.momData.driverReviews[dataToSave.id] 
    await dispatch(downloadDriverReviews(dataToSave.id));

    //Add the review data and save everything to state.uiData.uiMomDrvList.driverData
    const reviewArray = getState().momData.driverReviews[dataToSave.id];
    dataToSave.reviews = reviewArray;
    dispatch(setSTName_Found(dataToSave));
  }
}

/***********************************************************************
 The following are the actions for this reducer only for searching by
 driver's location 
************************************************************************/
//Initializes state to search by driver's location
function setSTLoca() {
  return {
    type: 'uiData/MomDrvList/setSTLoca'
  }
}

//Sets the type of sort for search by driver's location
export function setSTLoca_setSort(sortType) {
  return {
    type: 'uiData/MomDrvList/setSTLoca_setSort',
    payload: sortType
  }
}

//Sets the error flag
export function setSTLoca_setError(value) {
  return {
    type: 'uiData/MomDrvList/setSTLoca_setError',
    payload: value
  }
}