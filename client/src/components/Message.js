import React from "react";
import { connect } from "react-redux";
import styles from "../styles/Messages.module.css";
const Message = ({ message, auth }) => {
  let isSender = false;
  if (message.issuedBy === auth.user.nick) isSender = true;
  return (
    <div className={styles.messageWrapper}>
      {isSender ? (
        <div className={styles.ownMessage}>
          <h5 className={styles.nickname}>{message.issuedBy}:</h5>
          <p>{message.content}</p>
        </div>
      ) : (
        <div className={styles.message}>
          <h5 className={styles.nickname}>{message.issuedBy}:</h5>
          <p>{message.content}</p>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(Message);
