/*
The userData reducer state slice looks like this:

    If a mom/driver is not not logged in:
    {
      userType: 'null'
    }

    If a mom is logged in:
    {
      userType: 'mom',
      users_name: ,
      users_plot: ,
      users_phone_number: ,
      users_email:
    }

    If a driver is logged in:
    {
      userType: 'driver',
      drivers_name: ,
      drivers_plot: ,
      drivers_phone_number: , 
      drivers_email: ,
      drivers_price: 
    }

*/

const reducerInitialState = { 
  userType: 'mom'
};

export default function(state=reducerInitialState, action) {
  switch(action.type) {
    case 'resetReducers': {
      return reducerInitialState
    }
    case 'userData/setUserData': {
      
      return action.payload
    }
    case 'userData/updateUserData': {
      let newState = {...state, ...action.payload}
      return newState
    }
   

    default:
      return state;
  }
}


/***********************************************************************
 The following are the actions for this reducer only
 ***********************************************************************/
export function setUserData(data) {
  return {
    type: 'userData/setUserData',
    payload: data
  }
}

export function updateUserData(data) {
  return {
    type: 'userData/updateUserData',
    payload: data
  }
}

