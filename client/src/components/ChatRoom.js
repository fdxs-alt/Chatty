import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import Menu from "./Menu";
import Spinner from "./Spinner";
import styles from "../styles/Dashboard.module.css";
import Messages from "./Messages";
import { Button, Input } from "./Basic";
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
      setMessages(oldValue => [...oldValue, message]);
      messages.sort();
    });
  }, [setMessages]);
  const handleClick = e => {
    e.preventDefault();
    if (message)
      socket.emit("sendMessage", message, userName, roomName, () => {
        setMessage("");
      });
  };
  if (auth.isLoading || auth.isLoading == null)
    return <Spinner loading={auth.isLoading} size={300} />;
  else
    return (
      <div className={styles.container}>
        <Menu user={auth.user} />
        <div className={styles.content}>
          <Messages messages={messages} />
          <div className={styles.sendingCompontents}>
          <Input message={message} setMessage={setMessage} />
          <Button handleClick={handleClick} />
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(ChatRoom);
