/*

  This is state.userData

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


// const reducerInitialState = { 
//   userType: null
// };

// const reducerInitialState = { 
//   userType: 'mom',
//   users_name: 'seedMom1',
//   users_plot: '100',
//   users_phone_number: '1234-1000',
//   users_email: 'seedMom1@gmail.com'
// };

const reducerInitialState = { 
  drivers_email: "seedDriver1@gmail.com",
  drivers_name: "seedDriver1",
  drivers_phone_number: "4567-2001",
  drivers_plot: "70",
  drivers_price: 30,
  userType: "driver"
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



/***********************************************************************
 The following is some dummy data
 ***********************************************************************/
// const reducerInitialState = { 
//   userType: 'mom',
//   users_name: 'Alice',
//   users_plot: '123',
//   users_phone_number: '456',
//   users_email: 'al@gmail.com'
// };

// const reducerInitialState = { 
//   userType: 'mom',
//   users_name: 'seedMom1',
//   users_plot: '100',
//   users_phone_number: '1234-1000',
//   users_email: 'seedMom1@gmail.com'
// };