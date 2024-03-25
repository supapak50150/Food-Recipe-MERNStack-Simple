export function userReducer(state = null, action = null) {
    switch (action.type) {
      case "LOGGED_IN_USER":
        // console.log(action.payload);
        return action.payload;
       
      case "LOGOUT":
         localStorage.clear();
        return action.payload;
      default:
        return state;
    }
  }
  