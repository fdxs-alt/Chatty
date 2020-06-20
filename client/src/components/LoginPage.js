import React, { useState } from "react";
import styles from "../styles/LoginPage.module.css";
import loginImage from "../images/3911045.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/AuthActions";
const LoginPage = ({ auth, loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      password
    };
    loginUser(user);
    setEmail("");
    setPassword("");
  };
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <h1 className={styles.logo}>Chatty</h1>
        <img src={loginImage} alt="chat" className={styles.imageImage} />
        <h2>Comiunicate with your co-workers online</h2>
        <p>Great user experience, anytime</p>
      </div>
      <div className={styles.welcome}>
        <h3>Welcome!</h3>
        <p>Sign in your account</p>
        <form className={styles.loginForm}>
          <label htmlFor="">Email</label>
          <input
            value={email}
            type="email"
            placeholder="Your email"
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="">Password</label>
          <input
            value={password}
            type="password"
            placeholder="Your password"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={handleSubmit}
            onKeyPress={e => {
              if ((e.key = "enter")) handleSubmit();
            }}
            className={styles.loginButton}
          >
            Login
          </button>
        </form>
        <Link className={styles.registerLink} to="/register">
          Don't have an account, register now!
        </Link>
        <div className="icons">
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { loginUser })(LoginPage);