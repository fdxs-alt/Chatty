import React from "react";
import styles from "../styles/Basic.module.css";
export const Button = ({ handleClick }) => {
  return (
    <button
      className={styles.messageButton}
      onKeyPress={e => {
        if (e.key === "Enter") handleClick(e);
      }}
      onClick={e => handleClick(e)}
    >
      Send
    </button>
  );
};
export const Input = ({ message, setMessage }) => {
  return (
    <input
      type="text"
      value={message}
      onChange={e => setMessage(e.target.value)}
      className={styles.messageInput}
    />
  );
};
