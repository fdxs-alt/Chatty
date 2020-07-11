import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Reset.module.css";
const ResetByEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const sendEmail = e => {
    e.preventDefault();
    const mail = {
      email
    }
    axios
      .post("/auth/recoverpassword", mail)
      .then(res => setMessage(res.data.message))
      .catch(error => setError(error.response.data.error));
      setEmail('')
      setMessage('')
      setError('')
  };
  return (
    <div className={styles.changePassword}>
      <form>
        <h1>Change your password</h1>
        <label htmlFor="Email">Send email</label>
        <input
          placeholder="Type your email here"
          className={styles.passwordInput}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <h4 className={styles.error}>{error}</h4>
        <h4 className={styles.success}>{message}</h4>
        <button
          onClick={e => sendEmail(e)}
          onKeyPress={e => {
            if (e.key === "Enter") setEmail(e);
          }}
          className={styles.changeEmail}
        >
          Send Email
        </button>

        <Link className={styles.link} to="/">
          Log in!
        </Link>
      </form>
    </div>
  );
};

export default ResetByEmail;
