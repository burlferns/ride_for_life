/*
  The uiDataReducer reducer state slice looks like this:

  {
    uiMomDrvList: { ... }
    uiMomRvwList: { ... }
  }

  Where:
  -- uiMomDrvList is data to make the mom drivers listing page work.
  -- uiMomRvwList is data to make the mom drivers listing page work.
  See the respective slice reducers for the shape of the data

*/

import { combineReducers} from 'redux';
import uiMomDrvListReducer from './uiMomDrvListReducer.js';
import uiMomRvwListReducer from './uiMomRvwListReducer.js'

export default combineReducers(
  {
    uiMomDrvList: uiMomDrvListReducer, 
    uiMomRvwList: uiMomRvwListReducer
  }
)

