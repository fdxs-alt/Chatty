import {
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
} from "../actions/types";

const initalState = {
  token: localStorage.getItem("Authorization"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LOGIN_SUCCESS:
      localStorage.setItem("Authorization", action.payload.data.token);
      return {
        ...state,
        user: action.payload.data,
        token: action.payload.data.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS: {
      localStorage.removeItem("Authorization");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
