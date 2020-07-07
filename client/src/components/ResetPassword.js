import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import styles from "../styles/Reset.module.css";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = queryString.parse(window.location.search);

  const changePassword = e => {
    e.preventDefault();

    if (!token) return <Redirect to="/login" />;
    const data = {
      password,
      confirmPassword
    };
    axios
      .post(`/auth/reset/${token}`, data)
      .then(res => setMessage(res.data.message))
      .catch(error => setError(error.response.data.error));
    setPassword("");
    setConfirmPassword("");
  };
  if (!token) return <Redirect to="/login" />;
  else
    return (
      <div className={styles.changePassword}>
        <form>
          <h1>Change your password</h1>
          <label htmlFor="Password">Password</label>
          <input
            placeholder="Password..."
            className={styles.passwordInput}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            placeholder="Confrim password..."
            className={styles.passwordInput}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {error.length > 0 && <h4 className={styles.error}>{error}</h4>}
          {message.length > 0 && <h4 className={styles.success}>{message}</h4>}
          <button
            onClick={e => changePassword(e)}
            onKeyPress={e => {
              if (e.key === "Enter") changePassword(e);
            }}
            className={styles.changePasswordButton}
          >
            Change password
          </button>

          <Link className={styles.link} to="/login">
            Log in now!
          </Link>
        </form>
      </div>
    );
};

export default ResetPassword;
