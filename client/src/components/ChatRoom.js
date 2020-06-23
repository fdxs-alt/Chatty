import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
const queryString = require("query-string");

const ChatRoom = ({ auth }) => {
  const [roomName, setRoom] = useState("");
  const [userName, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io.connect("http://localhost:5000", {
    query: `token=${auth.token.split(" ")[1]}`
  });
  useEffect(() => {
    const { room, name } = queryString.parse(window.location.search);
    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, () => {});
    return () => {
      socket.emit("disconnect");
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.on("message", message => {
      setMessages(oldValue => [message, ...oldValue]);
    });
  }, [setMessages]);
  const handleClick = e => {
    e.preventDefault();
    if (message)
      socket.emit("sendMessage", message, userName, roomName, () => {
        setMessage("");
      });
  };
  return (
    <div>
      {messages.map(message => (
        <h1 key={Math.random() + 10000}>{message.text}</h1>
      ))}
      <input
        value={message}
        ntype="text"
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={handleClick}>Send</button>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(ChatRoom);
