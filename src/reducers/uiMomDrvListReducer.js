/*

  This is state.uiData.uiMomDrvList  in uiMomDrvListReducer.js

  The uiMomDrvList reducer state slice looks like this:

  If no search is selected or search is reset:
  {
    searchType: ''
  }

  If the search type is "Driver's email":
  {
    searchType: "Driver's email",
    driverId: '' is initial value
              'none' for when a driver is not found with the email
              'int' for when a driver is found and his id is an integer int
    driverData: this is the data to display. It is an empty object, or filled 
                with key/value pairs of driver data
  }


  If the search type is "Plot location range":
  {
    searchType: "Plot location range",
    drvsInLoca: [] i.e. empty array for initial state when search is not performed yet
                'none' for when drivers are not found within the location range
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

  If the search type is "Price range":
  {
    searchType: "Price range",
    drvsInPrice: [] i.e. empty array for initial state when search is not performed yet
                'none' for when drivers are not found within the price range
               [...] i.e. filled array when drivers are found 
    driverId: '' for when no driver details is requested
              'int' for when a driver details is requested
    driverData: this is the driver details to display.
    sortType: 'Rating' is initial value and it is sort by rating
              'Price' for sort by price 
    error: false is initial value but can be set to true if price inputs are 
           not integer numbers or upper range value is less than lower range 
           value. Upper equals lower is fine. 
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
     * These are for serching by email 
     * *********************************/
    case 'uiData/MomDrvList/setSTEmail': {
      return {
        searchType: "Driver's email",
        driverId: '',
        driverData: {}
      }
    }

    case 'uiData/MomDrvList/setSTEmail_None': {
      return {
        searchType: "Driver's email",
        driverId: 'none',
        driverData: {}
      }
    }
    
    case 'uiData/MomDrvList/setSTEmail_Found': {
      return {
        searchType: "Driver's email",
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
      return {
        searchType: "Plot location range",
        drvsInLoca: [],
        driverId: '',
        driverData: {},
        sortType: 'Rating',
        error: action.payload
      }
    }

    case 'uiData/MomDrvList/setSTLoca_None' : {
      const newState = {...state, drvsInLoca:'none'}
      return newState;
    }

    case 'uiData/MomDrvList/setSTLoca_Found' : {
      const newState = {...state, drvsInLoca:action.payload}
      return newState;
    }

    case 'uiData/MomDrvList/setSTLoca_DrvDetails' : {
      const newState = { ...state, 
        driverId:action.payload.driverId,
        driverData:action.payload.driverData
      }
      return newState;
    }


    /************************************* 
     * These are for serching by price 
     * ***********************************/
    case 'uiData/MomDrvList/setSTPrice': {
      return {
        searchType: "Price range",
        drvsInPrice: [],
        driverId: '',
        driverData: {},
        sortType: 'Rating',
        error: false
      }
    }

    case 'uiData/MomDrvList/setSTPrice_setSort': {
      const newState = {...state, sortType:action.payload}
      return newState;
    }

    case 'uiData/MomDrvList/setSTPrice_setError' : {
      return {
        searchType: "Price range",
        drvsInPrice: [],
        driverId: '',
        driverData: {},
        sortType: 'Rating',
        error: action.payload
      }
    }

    case 'uiData/MomDrvList/setSTPrice_None' : {
      const newState = {...state, drvsInPrice:'none'}
      return newState;
    }

    case 'uiData/MomDrvList/setSTPrice_Found' : {
      const newState = {...state, drvsInPrice:action.payload}
      return newState;
    }

    case 'uiData/MomDrvList/setSTPrice_DrvDetails' : {
      const newState = { ...state, 
        driverId:action.payload.driverId,
        driverData:action.payload.driverData
      }
      return newState;
    }

    /************************************* 
     * This is the default
     * ***********************************/
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

      case "Driver's email": {
        dispatch(setSTEmail());
        return;
      }

      case "Plot location range": {
        dispatch(setSTLoca());
        return;
      }

      case "Price range": {
        dispatch(setSTPrice());
        return;
      }

      default:
        return;
    }
  }
}

/***********************************************************************
 The following are the actions for this reducer only for searching by
 driver's email 
************************************************************************/
//Initializes state to search by driver's email
export function setSTEmail() {
  return {
    type: 'uiData/MomDrvList/setSTEmail'
  }
}

//Sets state if after a search the email is not found
function setSTEmail_None() {
  return {
    type: 'uiData/MomDrvList/setSTEmail_None'
  }
}

//Sets state if after a search the email is found
function setSTEmail_Found(data) {
  return {
    type: 'uiData/MomDrvList/setSTEmail_Found',
    payload: data
  }
}

//Perform the email search
export function doEmailSearch(email) {
  return async function(dispatch, getState) {
    const driverArray = getState().momData.drivers.driverArray;
    const found = driverArray.find(elem=>elem.drivers_email===email);
    if(found===undefined) {
      dispatch(setSTEmail_None());
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
    dispatch(setSTEmail_Found(dataToSave));
  }
}

/***********************************************************************
 The following are the actions for this reducer only for searching by
 driver's location 
************************************************************************/
//Initializes state to search by driver's location
export function setSTLoca() {
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

//Sets state if after a search no drivers are found in location range
function setSTLoca_None() {
  return {
    type: 'uiData/MomDrvList/setSTLoca_None'
  }
}

//Set the state if after a search there are drivers found in location range
function setSTLoca_Found(data) {
  return {
    type: 'uiData/MomDrvList/setSTLoca_Found',
    payload: data
  }
}

//Set the state to display the details of one driver
export function setSTLoca_DrvDetails(driverId, driverData) {
  return {
    type: 'uiData/MomDrvList/setSTLoca_DrvDetails',
    payload: {driverId, driverData}
  }
}

//Perform the search
export function doLocaSearch(lowVal,highVal) {
  return async function(dispatch,getState) {

    //Search the driverArray for drivers in the location range
    const driverArray = getState().momData.drivers.driverArray;
    lowVal = parseInt(lowVal);
    highVal = parseInt(highVal);
    const found = driverArray.filter(elem=>
      (parseInt(elem.drivers_plot)>=lowVal && parseInt(elem.drivers_plot)<=highVal) );
    if(found.length===0) {
      dispatch(setSTLoca_None());
      return;
    }  
    
    //Make sure for the found drivers, their driverReviews are in 
    //state.momData.driverReviews. Then attach the review to the respective
    //driver object in the found array
    for(let i=0; i<found.length; i++) {
      await dispatch(downloadDriverReviews(found[i].id));
      found[i].reviews = getState().momData.driverReviews[found[i].id];
      delete found[i].password;
    }

    //Put the found array in the state.uiData.uiMomDrvList.drvsInLoca
    dispatch(setSTLoca_Found(found));

    //Now sort the data in the array in state.uiData.uiMomDrvList.drvsInLoca
    dispatch(doLocaSort());
  }
}

//Perform the sort
export function doLocaSort() {
  return function(dispatch,getState) {
    const sortType = getState().uiData.uiMomDrvList.sortType;
    const arrayToSort = getState().uiData.uiMomDrvList.drvsInLoca;

    if(sortType==='Rating') {
      sortByRating(arrayToSort);
    }
    else{
      sortByPrice(arrayToSort);
    }

    dispatch(setSTLoca_Found(arrayToSort));
  }
}


/***********************************************************************
 The following are the actions for this reducer only for searching by
 driver's price
************************************************************************/
//Initializes state to search by driver's price
export function setSTPrice() {
  return {
    type: 'uiData/MomDrvList/setSTPrice'
  }
}

//Sets the type of sort for search by driver's price
export function setSTPrice_setSort(sortType) {
  return {
    type: 'uiData/MomDrvList/setSTPrice_setSort',
    payload: sortType
  }
}

//Sets the error flag
export function setSTPrice_setError(value) {
  return {
    type: 'uiData/MomDrvList/setSTPrice_setError',
    payload: value
  }
}

//Sets state if after a search no drivers are found in price range
function setSTPrice_None() {
  return {
    type: 'uiData/MomDrvList/setSTPrice_None'
  }
}

//Set the state if after a search there are drivers found in price range
function setSTPrice_Found(data) {
  return {
    type: 'uiData/MomDrvList/setSTPrice_Found',
    payload: data
  }
}

//Set the state to display the details of one driver
export function setSTPrice_DrvDetails(driverId, driverData) {
  return {
    type: 'uiData/MomDrvList/setSTPrice_DrvDetails',
    payload: {driverId, driverData}
  }
}

//Perform the search
export function doPriceSearch(lowVal,highVal) {
  return async function(dispatch,getState) {

    //Search the driverArray for drivers in the price range
    const driverArray = getState().momData.drivers.driverArray;
    lowVal = parseInt(lowVal);
    highVal = parseInt(highVal);
    const found = driverArray.filter(elem=>
      (parseInt(elem.drivers_price)>=lowVal && parseInt(elem.drivers_price)<=highVal) );
    if(found.length===0) {
      dispatch(setSTPrice_None());
      return;
    }  
    
    //Make sure for the found drivers, their driverReviews are in 
    //state.momData.driverReviews. Then attach the review to the respective
    //driver object in the found array
    for(let i=0; i<found.length; i++) {
      await dispatch(downloadDriverReviews(found[i].id));
      found[i].reviews = getState().momData.driverReviews[found[i].id];
      delete found[i].password;
    }

    //Put the found array in the state.uiData.uiMomDrvList.drvsInPrice
    dispatch(setSTPrice_Found(found));

    //Now sort the data in the array in state.uiData.uiMomDrvList.drvsInPrice
    dispatch(doPriceSort());
  }
}


//Perform the sort
export function doPriceSort() {
  return function(dispatch,getState) {
    const sortType = getState().uiData.uiMomDrvList.sortType;
    const arrayToSort = getState().uiData.uiMomDrvList.drvsInPrice;

    if(sortType==='Rating') {
      sortByRating(arrayToSort);
    }
    else{
      sortByPrice(arrayToSort);
    }

    dispatch(setSTPrice_Found(arrayToSort));
  }
}



/***********************************************************************
 The following are helper functions for the action creators above
************************************************************************/
function sortByRating(array) {
  array.sort( function(a,b) {
    let aRating;
    let bRating;

    if(a.reviews.reviews.length===0) {
      aRating = 0;
    }
    else {
      aRating = parseFloat(a.reviews.avgRating);
    }
    
    if(b.reviews.reviews.length===0) {
      bRating = 0;
    }
    else {
      bRating = parseFloat(b.reviews.avgRating);
    }

    if(aRating>bRating) {
      return -1;
    }

    if(aRating<bRating) {
      return 1;
    }
    
    //If aRating === bRating
    return 0;    
  })
}


function sortByPrice(array) {
  array.sort( function(a,b) {
    const aPrice = a.drivers_price;
    const bPrice = b.drivers_price;

    if(aPrice<bPrice) {
      return -1;
    }

    if(aPrice>bPrice) {
      return 1;
    }
    
    //If aPrice === bPrice
    return 0;    
  })
}