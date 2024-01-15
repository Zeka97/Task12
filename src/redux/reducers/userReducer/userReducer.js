import { UserActionTypes } from "./user.types";
import { isExpired, decodeToken } from "react-jwt";

const loadUser = () => {
  try {
    const storage = localStorage.getItem("user");

    if (storage) {
      return {
        currentUser: decodeToken(JSON.parse(storage).currentUser),
        isLogged: true,
      };
    } else {
      return {
        currentUser: null,
        isLogged: false,
      };
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

const INITIAL_STATE = loadUser();

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        isLogged: true,
      };
    case UserActionTypes.LOG_OUT:
      return {
        ...state,
        currentUser: null,
        isLogged: false,
      };
    default:
      return state;
  }
};

export default userReducer;
