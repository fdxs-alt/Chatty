import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Options.module.css";
import { setConfig } from "../util/setConfig";
import { connect } from "react-redux";
import { logout, getUser } from "../redux/actions/AuthActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
const Options = ({ auth, logout, getUser }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const [nicknameChangeMessage, setNicknameChangeMessage] = useState("");
  const [nicknameChangeError, setNicknameChangeError] = useState("");

  const handlePasswordChange = e => {
    setPasswordChangeError("");
    setPasswordChangeMessage("");
    e.preventDefault();
    const data = {
      password,
      confirmPassword
    };
    axios
      .post(
        `/user/changepassword/${auth.user._id}`,
        data,
        setConfig(auth.token)
      )
      .then(res => {
        setPasswordChangeMessage(res.data.message);
      })
      .catch(error => setPasswordChangeError(error.response.data.error));
    setConfirmPassword("");
    setPassword("");
  };
  const handleDelete = e => {
    axios
      .delete(`/user/deleteAccount/${auth.user._id}`, setConfig(auth.token))
      .then(() => logout())
      .catch(err => console.log(err));
  };
  const handleNickChange = e => {
    e.preventDefault();
    setNicknameChangeError("");
    setNicknameChangeMessage("");
    const data = {
      nick: nickname
    };
    axios
      .post(`/user/changeNick/${auth.user._id}`, data, setConfig(auth.token))
      .then(res => {
        setNicknameChangeMessage(res.data.message);
      })
      .catch(error => setNicknameChangeError(error.response.data.error));
    setNickname("");
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.form}>
          <form className={styles.formContainer}>
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

            <h4 className={styles.success}>{passwordChangeMessage}</h4>
            <h4 className={styles.error}>{passwordChangeError}</h4>

            <button onClick={e => handlePasswordChange(e)}>Change now</button>
          </form>
          <form className={styles.formContainer}>
            <h2>Change Your nickname</h2>
            <label htmlFor="nickname">Nickname</label>
            <input
              value={nickname}
              type="text"
              placeholder="Nickname..."
              onChange={e => setNickname(e.target.value)}
            />

            <h4 className={styles.success}>{nicknameChangeMessage}</h4>
            <h4 className={styles.error}>{nicknameChangeError}</h4>

            <button onClick={e => handleNickChange(e)}>Change nickname</button>

            <h2>Delete account</h2>
            <button onClick={e => handleDelete(e)}>Delete</button>
          </form>
          <Link className={styles.link} to="/dashboard">
            Back to dashboard
          </Link>
        </div>
        <FontAwesomeIcon className={styles.imageContainer}icon={faCogs} />
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout, getUser })(Options);
