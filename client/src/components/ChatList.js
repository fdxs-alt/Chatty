import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ChatList.module.css";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { getRooms } from "../redux/actions/RoomActions";
const ChatList = ({ auth, rooms, getRooms }) => {
  useEffect(() => {
    getRooms(auth.token)
  }, [auth.token, getRooms]);
  if (rooms.isLoading) return <Spinner loading={rooms.isLoading} size={150} />;
  else
    return (
      <div className={styles.chatlist}>
        <h1>Chatrooms</h1>
        <ul className={styles.chats}>
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
        </ul>
      </div>
    );
};
const mapStateToProps = state => ({
  auth: state.auth,
  rooms: state.rooms
});
export default connect(mapStateToProps, {getRooms})(ChatList);
