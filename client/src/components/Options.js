import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Options.module.css";
const Options = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form}>
          <h2>Change Password</h2>
          <label value={password} htmlFor="password">
            Password
          </label>
          <input
            value={password}
            type="password"
            placeholder="Password..."
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="nickname">Confirmation Password</label>
          <input
            value={confirmPassword}
            type="password"
            placeholder="Confirmation Password..."
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button>Change now</button>
          <h2>Change Your nickname</h2>
          <label htmlFor="nickname">Nickname</label>
          <input
            value={nickname}
            type="text"
            placeholder="Nickname..."
            onChange={e => setNickname(e.target.value)}
          />
          <button>Change nickname</button>
          <h2>Delete account</h2>
          <button>Delete</button>
          <Link className={styles.link} to="/dashboard">
            Back to dashboard
          </Link>
        </form>
        <img src="" alt="settings" className={styles.imageContainer} />
      </div>
    </div>
  );
};

export default Options;
