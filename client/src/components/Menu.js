import React, { useState } from "react";
import styles from "../styles/Menu.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/AuthActions";
import Modal from "./Modal";
import { updateChatroom } from "../redux/actions/RoomActions";
const Menu = ({logout, auth, updateChatroom }) => {
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const handleClick = () => {
    updateChatroom(roomName, auth.user.nick, auth.token);
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.hero}>
        <h1 className={styles.nick}>{auth.user.nick}</h1>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link to="/options" className={styles.link}>
            My account
          </Link>
        </li>
        <li>
          <Modal open={open} setOpen={setOpen}>
            <h1 className={styles.create}>Create your own room!</h1>
            <input
              type="text"
              value={roomName}
              className={styles.modalInput}
              onChange={e => setRoomName(e.target.value)}
              placeholder="Type name of your room here"
            />
            <button className={styles.createRoomButton} onClick={() => handleClick()}>Create new chat</button>
          </Modal>
          <button className={styles.modalButton}onClick={() => setOpen(true)}>Create new chat</button>
        </li>
      </ul>
      <button className={styles.logout} onClick={() => logout()}>
        Log out
      </button>
      <h1 className={styles.logo}>Chatty</h1>
    </nav>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout, updateChatroom })(Menu);
