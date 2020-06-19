const express = require("express");
const router = express.Router();
const passport = require("passport");
const ChatRoom = require("../models/ChatRoom");
router.get(
  "/chatrooms",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ChatRoom.find().then(chatrooms => {
      res.status(200).json(chatrooms);
    }).catch(err => console.log(err))
  }
);
module.exports = router;
