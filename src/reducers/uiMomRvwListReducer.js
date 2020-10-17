/*

  This is state.uiData.uiMomRvwList

  The uiMomRvwList reducer state slice looks like this:

  {
    
  }

*/





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