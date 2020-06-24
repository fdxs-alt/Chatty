const ChatRoom = require("../models/ChatRoom");
const moment = require("moment");
module.exports = function(message, io, callback, name, room) {
  ChatRoom.findOne({ name: room }).then(chatroom => {
    ChatRoom.findByIdAndUpdate(
      { _id: chatroom._id },
      {
        $addToSet: {
          messages: [
            {
              content: message,
              issuedBy: name
            }
          ]
        }
      }
    ).catch(error => callback(error));
    io.to(room).emit("message", {
      user: name,
      text: message,
      sendAt: moment().format("MMMM Do YYYY, h:mm:ss a")
    });
  });
};
