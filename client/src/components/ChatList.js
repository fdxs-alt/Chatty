import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/ChatList.module.css";
import { connect } from "react-redux";
import Spinner from './Spinner'
const ChatList = ({ auth }) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  if (auth.token) {
    config.headers["Authorization"] = auth.token;
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get("/user/chatrooms", config)
      .then(res => {
        setChatrooms(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);
  if (loading) return <Spinner loading={loading} size={150}/>
  else
    return (
      <div className={styles.chatlist}>
        <h1 className={styles.chat}>Chat</h1>
        <div className={styles.chats}>
          {chatrooms.map(chatroom => (
            <Link to={`/chat/${chatroom.name}/${auth.user.nick}`} key={chatroom._id}>{chatroom.name}</Link>
          ))}
        </div>
      </div>
    );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(ChatList);
