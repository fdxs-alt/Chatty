import React from "react";
import styles from "../styles/Menu.module.css";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {logout} from '../redux/actions/AuthActions'
const Menu = ({user, logout}) => {
  
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
            <Link to="/create" className={styles.link}>
              Create new chat
            </Link>
          </li>
        </ul>
        <button className={styles.logout} onClick={() => logout()}>Log out</button>
        <h1 className={styles.logo}>Chatty</h1>
      </nav>
    );
};

export default connect(null, {logout})(Menu);
