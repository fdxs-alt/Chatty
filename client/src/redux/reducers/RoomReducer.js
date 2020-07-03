import { LOAD_ROOMS, ADD_ROOM, GET_ROOMS } from "../actions/types";

const initalState = {
  rooms: [],
  isLoading: false
};
export default (state = initalState, action) => {
  switch (action.type) {
    case LOAD_ROOMS:
      return {
        ...state,
        isLoading: true
      };
    case GET_ROOMS:
      return {
        isLoading: false,
        rooms: action.payload
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload]
      };
    default:
      return {
        ...state
      };
  }
};
