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
  userType: null
};

export default function(state=reducerInitialState, action) {
  switch(action.type) {
    case 'userData/setMomData': {
      
      return {...action.payload}
    }

    default:
      return state;
  }
}


/***********************************************************************
 The following are the actions for this reducer only
 ***********************************************************************/
export function setMomData(data) {
  return {
    type: 'userData/setMomData',
    payload: data
  }
}


