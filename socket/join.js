const ChatRoom = require("../models/ChatRoom");
const moment = require("moment");
module.exports = function(socket, name, room, callback) {
  ChatRoom.findOne({ name: room })
    .then(chatroom => {
      if (!chatroom.users.includes(name))
        ChatRoom.findByIdAndUpdate(
          { _id: chatroom._id },
          {
            $addToSet: {
              users: name
            }
          }
        ).catch(error => callback(error));
      socket.emit("message", {
        user: "admin",
        text: `${name} welcome to the ${room}`,
        sendAt: moment().format("MMMM Do YYYY, h:mm:ss a")
      }); 
      socket.broadcast.emit("message", {
        user: "admin",
        text: `${name} has joined`,
        sendAt: moment().format("MMMM Do YYYY, h:mm:ss a")
      });

      socket.join(room);
    })
    .catch(error => callback(error));
};
