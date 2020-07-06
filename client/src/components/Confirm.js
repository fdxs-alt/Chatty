import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import Spinner from "./Spinner";
import styles from "../styles/Confirm.module.css";
import errorIlu from "../images/error.jpg";
import successIlu from "../images/czat.jpg";
import { Link } from "react-router-dom";
const Confirm = () => {
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const sendEmail = e => {
    e.preventDefault();
    const req = {
      email
    };
    axios
      .post("/auth/resend", req)
      .then(res => setError(res.data))
      .catch(err => setError(err.response.data));
  };
  useEffect(() => {
    setLoading(true);
    const { token } = queryString.parse(window.location.search);
    axios
      .post(`/auth/confirm/${token}`)
      .then(res => {
        setMessage(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response.data);
        setLoading(false);
      });
  }, []);
  if (loading) return <Spinner loading={loading} size={300} />;
  else
    return (
      <div className={styles.container}>
        {message !== "" ? (
          <div className={styles.success}>
            <img src={successIlu} alt="success-ilu" />
            <h1>{message.message}</h1>
            <Link className={styles.link} to="/login">
              Login in now!
            </Link>
          </div>
        ) : (
          <form className={styles.error}>
            <img src={errorIlu} alt="error-ilu" />
            <h1>{error.error}</h1>
            <Link className={styles.link} to="/login">
              Login in, or
            </Link>
            {!error.confirmed && (
              <>
                <label htmlFor="Email adress to verify">
                  Send new verification-mail
                </label>
                <input
                  placeholder="Your email"
                  value={email}
                  type="text"
                  onChange={e => setEmail(e.target.value)}
                  className={styles.emailInput}
                />
                <button onClick={e => sendEmail(e)}>Resend email</button>
              </>
            )}
          </form>
        )}
      </div>
    );
};

export default Confirm;
