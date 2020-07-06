import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState([]);
  const [error, setError] = useState([]);
  const { token } = queryString(window.location.search);
  const changePassword = e => {
    e.preventDefault();
    const data = {
      password,
      confirmPassword
    };
    axios
      .post(`/auth/reset/${token}`, data)
      .then(res => setMessage(res.data))
      .catch(error => setError(error.response.data));
  };
  return (
    <form>
      <intput
        type="text"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <intput
        type="text"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button
        onClick={e => changePassword(e)}
        onKeyPress={e => {
          if (e.key === "Enter") changePassword(e);
        }}
      >
        Change password
      </button>
      <Link to="/login"></Link>
    </form>
  );
};

export default ResetPassword;
