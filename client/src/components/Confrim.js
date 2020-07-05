import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import Spinner from "./Spinner";
import styles from "../styles/Confirm.module.css";
import errorIlu from "../images/error.jpg";
import successIlu from "../images/czat.jpg";
import { Link } from "react-router-dom";
const Confrim = () => {
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
            <Link className={styles.link}to="/login">Login in now!</Link>
          </div>
        ) : (
          <div className={styles.error}>
            <img src={errorIlu} alt="error-ilu" />
            <h1>{error.error}</h1>
            <button>Resend email</button>
          </div>
        )}
      </div>
    );
};

export default Confrim;
