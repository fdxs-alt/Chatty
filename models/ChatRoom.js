const mongoose = require("mongoose");
const moment = require("moment");
const ChatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  founder: {
    type: String,
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
  messages: [
    {
      content: {
        type: String,
      },
      issuedBy: {
        type: String,
      },
      emailOfIssuer: {
        type: String,
      },
      date: {
        type: String,
        default: moment().format("MMMM Do YYYY, h:mm:ss a"),
      },
    },
  ],
});

module.exports = mongoose.model("ChatRoom", ChatroomSchema);
