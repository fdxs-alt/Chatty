import { GET_ERRORS, CLEAN_ERRORS } from "../actions/types";

const initialState = {
  message: {},
  status: null
};  

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS: {
      return {
          message: action.payload.error,
          status: action.payload.status
      };
    }
    case CLEAN_ERRORS: {
        return {
            message: {},
            status: null
        }
    }
    default:
      return state;
  }
};
