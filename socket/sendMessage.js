const ChatRoom = require("../models/ChatRoom");
const moment = require("moment");
module.exports = function(message, io, callback, email, name, room) {
  ChatRoom.findOne({ name: room }).then(chatroom => {
    ChatRoom.findByIdAndUpdate(
      { _id: chatroom._id },
      {
        $addToSet: {
          messages: [
            {
              content: message,
              issuedBy: name,
              emailOfIssuer: email
            }
          ]
        }
      }
    ).catch(error => callback(error));
    io.to(room).emit("message", {
      issuedBy: name,
      content: message,
      emailOfIssuer: email,
      date: moment().format("MMMM Do YYYY, h:mm:ss a")
    });
  });
};
