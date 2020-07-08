import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Options.module.css";
const Options = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form}>
          <h2>Change Password</h2>
          <label htmlFor="password">Password</label>
          <input type="text" placeholder="Password..." />
          <label htmlFor="nickname">Confirmation Password</label>
          <input type="text" placeholder="Confirmation Password..." />
          <button>Change now</button>
          <h2>Change Your nickname</h2>
          <label htmlFor="nickname">Nickname</label>
          <input type="text" placeholder="Nickname..." />
          <button>Change nickname</button>
          <h2>Delete account</h2>
          <button>Delete</button>
          <Link className={styles.link} to="/dashboard">
            Back to dashboard
          </Link>
        </form>
        <img src="" alt="settings" className={styles.imageContainer}/>
      </div>
    </div>
  );
};

export default Options;
