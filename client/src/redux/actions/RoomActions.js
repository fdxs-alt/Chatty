import { LOAD_ROOMS, ADD_ROOM, GET_ROOMS, GET_ERRORS } from "../actions/types";

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
      dispatch({ type: GET_ERRORS });
    });
};
export const updateChatroom = (roomName, user, token) => dispatch => {
  const roomData = {
    chatroom: roomName,
    user
  };
  Axios.post("/user/addRoom", roomData, setConfig(token))
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_ROOM, payload: res.data });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: GET_ERRORS });
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
