const mongoose = require("mongoose");
const moment = require("moment");
const ChatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  users: {
    type: Array,
    required: true
  },
  messages: [
    {
      content: {
        type: String
      },
      issuedBy: {
        type: String
      },
      date: {
        type: Date,
        default: moment().format("MMMM Do YYYY, h:mm:ss a")
      }
    }
  ]
});

module.exports = mongoose.model('ChatRoom', ChatroomSchema);
