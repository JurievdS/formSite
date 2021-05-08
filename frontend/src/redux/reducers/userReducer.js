import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../actions/types";

const UserLoginInitialState = {
  error: {},
  isAuthenticated: false,
  userInfo: {},
};

export const userLoginReducer = (state = UserLoginInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        isAuthenticated: true,
      };
    case USER_LOGOUT:
      return {
        error: {},
        isAuthenticated: false,
        userInfo: {},
      };
    default:
      return state;
  }
};
