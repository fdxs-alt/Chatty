import React, { useState } from "react";
import styles from "../styles/Menu.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/AuthActions";
import Modal from "./Modal";
const Menu = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <nav className={styles.navbar}>
      <div className={styles.hero}>
        <h1 className={styles.nick}>{user.nick}</h1>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link to="/options" className={styles.link}>
            My account
          </Link>
        </li>
        <li>
          <Modal open={open} setOpen={setOpen}>
            <input type="text" />
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

export default connect(null, { logout })(Menu);
