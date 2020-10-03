const reducerInitialState = {
  userType : 'mom'
}

export default function(state=reducerInitialState, action) {
  switch(action.type) {
    case 'setUserTypeMom' : {
      const newState = {
        ...state,
        userType : 'mom'
      }
      return newState;
    }

    case 'setUserTypeDriver' : {
      const newState = {
        ...state,
        userType : 'driver'
      }
      return newState;
    }

    case 'setUserTypeNone' : {
      const newState = {
        ...state,
        userType : null
      }
      return newState;
    }

    default:
      return state;
  }
}