import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = () => {
  const ENDPOINT = "http://localhost:5000";
  const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWVhMjU2M2NjY2FmYjBlYmNhNGZlMTgiLCJpYXQiOjE1OTI1ODUwMTcsImV4cCI6MTU5MjU4ODYxN30.Fm44rYkEE_jOQRXcYIrr2K_H7q-phVkHN0SfG47Nz7s";
  const socket = io.connect(ENDPOINT, {
  query: `token=${jwt}`
});
 
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('authenticate', {token: jwt} )
      .on('authenticated', () => {
        socket.emit('join', {user: "XD", room: "xd"}, () => {
         
        })
      })
    })
    socket.on('unauthorized', (msg) => {
      console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
      
    }, [])

  });

  return <div></div>;
};

export default Chat;
