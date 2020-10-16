
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