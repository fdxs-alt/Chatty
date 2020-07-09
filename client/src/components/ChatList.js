import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ChatList.module.css";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { getRooms, deleteRoom } from "../redux/actions/RoomActions";
import { css } from "glamor";
import ScrollToBottom from "react-scroll-to-bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
const style = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  maxHeight: "650px",
  padding: "0.2rem"
});
const ChatList = ({ auth, rooms, getRooms, deleteRoom }) => {
  useEffect(() => {
    getRooms(auth.token);
  }, [auth.token, getRooms]);
  if (rooms.isLoading) return <Spinner loading={rooms.isLoading} size={150} />;
  else
    return (
      <div className={styles.chatlist}>
        <h1>Chatrooms</h1>

        <ul className={styles.chats}>
          {rooms.rooms.length === 0 && (
            <h2 style={{ textAlign: "center" }}>
              There aren't any chatrooms!{" "}
              <FontAwesomeIcon
                className={styles.imageContainer}
                icon={faFrown}
              />
            </h2>
          )}
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
                {chatroom.founder === auth.user.email ? (
                  <button
                    className={styles.modalButton}
                    onClick={e => deleteRoom(auth.token, chatroom._id)}
                  >
                    X
                  </button>
                ) : null}
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
export default connect(mapStateToProps, { getRooms, deleteRoom })(ChatList);
