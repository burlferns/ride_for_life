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
      users_name: ,
      users_plot: ,
      users_phone_number: , 
      users_email: ,
      drivers_price: 
    }

*/

const reducerInitialState = { };

export default function(state=reducerInitialState, action) {
  switch(action.type) {
    

    default:
      return state;
  }
}






