/*

  This is state.uiData.uiMomDrvList

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
  }







  
  }

*/

const reducerInitialState = { 
  searchType: ''
};

export default function(state=reducerInitialState, action) {
  switch(action.type) {
    case 'resetReducers': {
      return reducerInitialState;
    }
    case 'uiData/MomDrvList/resetST': {
      return reducerInitialState;
    }
    case 'uiData/MomDrvList/setSTName': {
      return {
        searchType: "Driver's name",
        driverId: ''
      }
    }
    


    default:
      return state;
  }
}

/***********************************************************************
 The following are the actions for this reducer only
 ***********************************************************************/
//This resets the search type if the Drop Down Menu used to choose the 
//the type of search is reset to its initial state of nothing choosen 
function resetST() {
  return {
    type: 'uiData/MomDrvList/resetST'
  }
}

//Initializes state to search by driver's name
function setSTName() {
  return {
    type: 'uiData/MomDrvList/setSTName'
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

    }
  }
}