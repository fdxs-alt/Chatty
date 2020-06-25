import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/ChatList.module.css";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { setConfig } from "../util/setConfig";
const ChatList = ({ auth }) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/user/chatrooms", setConfig(auth.token))
      .then(res => {
        setChatrooms(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [auth.token]);
  if (loading) return <Spinner loading={loading} size={150} />;
  else
    return (
      <div className={styles.chatlist}>
        <h1>Chatrooms</h1>
        <ul className={styles.chats}>
          {chatrooms.map(chatroom => (
            <li key={chatroom._id}>
              <Link
                to={`/chat?room=${chatroom.name}&name=${auth.user.nick}`}
                className={styles.links}
                key={chatroom._id}
              >
                {chatroom.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(ChatList);
