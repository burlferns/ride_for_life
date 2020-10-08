/*
The root reducer state slice looks like this:
{
  userData: { ... },
  momData: { ... },
  driverData: { ... }
}

Where:
  -- userData is info about the user, whether it is a mom or driver.
  -- momData is info for a mom user.
  -- driverData is info for a driver.
See the respective slice reducers for the shape of the data


In addtion when a user is logged in the following will be stored in
localstorage: 
  -- authToken 
  -- userId

*/




