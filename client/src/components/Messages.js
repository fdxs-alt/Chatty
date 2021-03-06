import React from "react";
import { css } from "glamor";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const Messages = ({ messages, canLoad, handleLoadMore }) => {
  const style = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "70vh",
    padding: "0.2rem",
  });
  const button = css({
    width: "100%",
    fontSize: "1.2rem",
    margin: "0.4rem 0",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "inherit",
    opacity: "0.6",
    padding: "0.4rem",
    cursor: "pointer",
    ":hover": {
      opacity: "1",
    },
  });
  return (
    <ScrollToBottom className={style}>
      {canLoad ? (
        <div className={button} onClick={handleLoadMore}>
          Click to load more...
        </div>
      ) : null}
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
