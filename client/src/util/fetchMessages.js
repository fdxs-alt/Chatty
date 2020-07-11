import Axios from "axios";
import { setConfig } from "./setConfig";
export const fetchMessages = (
  page,
  room,
  token,
  setLoading,
  setMessages,
  setCanLoad
) => {
  Axios.get(`/user/messeges/${room}/page/${page}`, setConfig(token))
    .then(res => {
      if (res.data.length <= 0) setCanLoad(false);
      setMessages(oldMessages => [...res.data, ...oldMessages]);
      setLoading(false);
    })
    .catch(err => console.log(err));
};
export const updateChatroom = (roomName, user, token) => {
  const roomData = {
    chatroom: roomName,
    user
  };
  Axios.post("/user/addRoom", roomData, setConfig(token))
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
