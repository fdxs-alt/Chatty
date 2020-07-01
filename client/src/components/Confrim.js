import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
const Confrim = () => {
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([]);
  useEffect(() => {
    setLoading(true);
    const { token } = queryString.parse(window.location.search);
    axios
      .post(`/auth/confirm/${token}`)
      .then(res => {
        setMessage(res.data);
      })
      .catch(err => {
        setError(err);
      });
    setLoading(false);
  }, []);
  if (loading) return <h1>Loading</h1>;
  else
    return <div>{message ? <h1>{message.message}</h1> : <h1>{error}</h1>}</div>;
};

export default Confrim;
