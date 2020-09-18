import {
  LOAD_ROOMS,
  ADD_ROOM,
  GET_ROOMS,
  DELETE_ROOM
} from "../actions/types";

import { returnErrors } from "./ErrorActions";
import Axios from "axios";

export const getRooms = token => dispatch => {
  dispatch({ type: LOAD_ROOMS });
  Axios.get("/user/chatrooms", setConfig(token))
    .then(res => {
      dispatch({ type: GET_ROOMS, payload: res.data });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
export const deleteRoom = (token, id) => dispatch => {
  Axios.delete(`/user/deleteRoom/${id}`, setConfig(token))
    .then(res => {
      dispatch({ type: DELETE_ROOM, payload: id });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
export const updateChatroom = (roomName, user, token, email) => dispatch => {
  const roomData = {
    chatroom: roomName,
    user, 
    email
  };
  Axios.post("/user/addRoom", roomData, setConfig(token))
    .then(res => {
      
      dispatch({ type: ADD_ROOM, payload: res.data });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
const setConfig = token => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
};
