import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";
import RoomReducer from './RoomReducer'
export default combineReducers({
  auth: AuthReducer,
  error: ErrorReducer,
  rooms: RoomReducer
});
