import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
const Confrim = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([])
  useEffect(() => {
    const { token } = queryString.parse(window.location.search);
    setLoading(true);
    axios
      .post(`/auth/confirm/${token}`)
      .then(res => {
       setMessage(res.data)
      })
      .catch(err => {
        setError(err);
      });
    setLoading(false);
  }, []);
  return (
    <div>{!error && <h1>Your email has been confirmed, Log in now!</h1>}</div>
  );
};

export default Confrim;
