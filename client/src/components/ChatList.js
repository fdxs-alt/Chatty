import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ChatList.module.css";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { getRooms } from "../redux/actions/RoomActions";
import { css } from "glamor";
import ScrollToBottom from "react-scroll-to-bottom";
const style = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  maxHeight: "650px",
  padding: "0.2rem"
});
const ChatList = ({ auth, rooms, getRooms }) => {
  useEffect(() => {
    getRooms(auth.token);
  }, [auth.token, getRooms]);
  if (rooms.isLoading) return <Spinner loading={rooms.isLoading} size={150} />;
  else
    return (
      <div className={styles.chatlist}>
        <h1>Chatrooms</h1>
        <ul className={styles.chats}>
          <ScrollToBottom className={style}>
            {rooms.rooms.map(chatroom => (
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
          </ScrollToBottom>
        </ul>
      </div>
    );
};
const mapStateToProps = state => ({
  auth: state.auth,
  rooms: state.rooms
});
export default connect(mapStateToProps, { getRooms })(ChatList);
