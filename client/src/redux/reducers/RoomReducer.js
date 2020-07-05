import { LOAD_ROOMS, ADD_ROOM, GET_ROOMS, DELETE_ROOM } from "../actions/types";

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
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(room => room._id !== action.payload)
      };

    default:
      return {
        ...state
      };
  }
};
