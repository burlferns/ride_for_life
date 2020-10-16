/*
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
      }











    }




  }


*/

import {timeDelta} from './rootReducer.js';



const reducerInitialState = { };

export default function(state=reducerInitialState, action) {
  switch(action.type) {
    case 'resetReducers': {
      return reducerInitialState
    }

    default:
      return state;
  }
}


