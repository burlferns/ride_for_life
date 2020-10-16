/*
  The uiMomDrvList reducer state slice looks like this:

  {
    searchType: This is the type of search to be done. Valid values are:
                '', "Driver's name", "Plot location range", "Price range"

    unSortedData: Once a search is done, this will point to an array of drivers
                  that meet the search criteria

    sortType: This is the type of sort to be done. Valid values are:
              '', 'Price', 'Rating'

    sortedData: Once a sort is done, this will point to an array of sorted
                drivers

    driverIdDetail: This has the id of the driver whose details are supposed
                    to be shown

    searchFunc: This points to the search function that is to be run when the
                search button is clicked
  }

*/

const reducerInitialState = { 
  searchType: '',
  unSortedData: [],
  sortType: '',
  sortedData: [],
  driverIdDetail: '',
  searchFunc: null
};

export default function(state=reducerInitialState, action) {
  switch(action.type) {
    case 'resetReducers': {
      return reducerInitialState
    }
    case 'uiData/MomDrvList/setSearchType': {
      let newState = {...state, searchType:action.payload};
      return newState;
    }


    default:
      return state;
  }
}

/***********************************************************************
 The following are the actions for this reducer only
 ***********************************************************************/
export function setSearchType(data) {
  return {
    type: 'uiData/MomDrvList/setSearchType',
    payload: data
  }
}