import React, { useState } from "react";
import styles from "../styles/Menu.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/AuthActions";
import { Button } from "./Basic";
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
            <input
              type="text"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
            />
            <Button handleClick={handleClick} />
          </Modal>
          <button onClick={() => setOpen(true)}>Create new chat</button>
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
