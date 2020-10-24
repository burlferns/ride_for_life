/*

  This is state.uiData.uiMomRvwList

  The uiMomRvwList reducer state slice looks like this:

  {
    driverList: '' for when a search is not yet done of all drivers that 
                    mom who is logged in has reviewed
                [] for when a search is done for all the drivers that a mom
                    has reviewed, but none are found
                [...] for when a search is done for all the drivers that a mom
                    has reviewed, and at least one is found
    driverId: '' for when no driver details is requested
              'int' for when a driver details is requested
    driverData: this is the driver details to display. It is null when driverId is '', and otherwise
                  it is as described below
  }

  Note that driverData looks like this when the logged in mom has a review of the driver:
  {
    id:  ...
    drivers_name:  ...
    drivers_plot:  ...
    drivers_phone_number:  ...
    drivers_email:  ...
    drivers_price: ...
    review: { ... } This is the object containing review data
  }

  Note that driverData looks like this when the logged in mom has no review of the driver:
  {
    id:  ...
    drivers_name:  ...
    drivers_plot:  ...
    drivers_phone_number:  ...
    drivers_email:  ...
    drivers_price: ...
    review: {} This is an empty object
  }

*/


const reducerInitialState = { 
  driverList: '',
  driverId: '',
  driverData: null
};


/***********************************************************************
 The following is the reducer function
************************************************************************/
export default function(state=reducerInitialState, action) {
  switch(action.type) {
    case 'resetReducers': {
      return reducerInitialState;
    }

    case 'uiData/MomRvwList/resetState': {
      return reducerInitialState;
    }
   
    case 'uiData/MomRvwList/setDriverList': {
      const newState = {...state, driverList:action.payload};
      return newState;
    }


    default:
      return state;
  }
}


/***********************************************************************
 The following are the actions for this reducer only
************************************************************************/
//This resets the mom review page state
export function resetState() {
  return {
    type: 'uiData/MomRvwList/resetState'
  }
}

//This sets the driverList to point to an empty array
//or non-empty array
export function setDriverList(data) {
  return {
    type: 'uiData/MomRvwList/setDriverList',
    payload: data
  }
}


