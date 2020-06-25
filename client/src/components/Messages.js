import React from "react";
import { css } from "glamor";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const Messages = ({ messages }) => {
  const style = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    maxHeight: "700px"
  });
  return (
    <ScrollToBottom className={style}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
