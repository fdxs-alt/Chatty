import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import registerImage from "../images/5551.jpg";
import styles from "../styles/RegisterPage.module.css";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/AuthActions";
import { clearErrors } from "../redux/actions/ErrorActions";

const RegistePage = ({ registerUser, error, clearErrors }) => {
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    clearErrors();
  }, [clearErrors]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
      nick,
    };
    registerUser(newUser);
    setEmail("");
    setNick("");
    setPassword("");
    clearErrors();
  };
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h3>Hello!</h3>
        <p>Register your account</p>
        <form className={styles.registerForm}>
          <label htmlFor="nick">Nick</label>
          <input
            value={nick}
            type="email"
            placeholder="Your nick"
            onChange={(e) => setNick(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.message && (
            <h2 className={styles.error}>{error.message.error}</h2>
          )}
          <button className={styles.registerButton} onClick={handleSubmit}>
            Register
          </button>
        </form>
        <Link className={styles.loginLink} to="/">
          Already have account, log in
        </Link>
        <div className="icons">
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
      <div className={styles.image}>
        <h1 className={styles.logo}>Chatty</h1>
        <img src={registerImage} alt="chat" />
        <h2 style={{ textAlign: "center" }}>Join our team right now!</h2>
        <p style={{ textAlign: "center" }}>
          Great user experience, Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Repellendus nostrum laboriosam optio aperiam earum,
          praesentium excepturi adipisci architecto. Iste, sunt?
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});
export default connect(mapStateToProps, { registerUser, clearErrors })(
  RegistePage
);
