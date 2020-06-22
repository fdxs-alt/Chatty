import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
const queryString = require("query-string");
const ChatRoom = ({ auth }) => {
  const [roomName, setRoom] = useState("");
  const [userName, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = io.connect("http://localhost:5000");

  useEffect(() => {
    const { room, name } = queryString.parse(window.location.search);
    setRoom(room);
    setName(name);
    socket.on("connect", () => {
      socket
        .emit("authenticate", { token: auth.token.split(" ")[1] })
        .on("authenticated", () => {
          socket.emit("join", { name, room }, () => {});
        })
        .on("unauthorized", () => {
          socket.off();
        });
      return () => {
        socket.emit("disconnect", { name });
        socket.off();
      };
    });
  }, [auth.token]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([message, ...messages]);
    });
    console.log(messages);
  }, [messages]);

  return <div>ChatRoom</div>;
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(ChatRoom);
