const express = require("express");
const router = express.Router();
const passport = require("passport");
const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
router.get(
  "/chatrooms",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ChatRoom.find()
      .then(chatrooms => {
        res.status(200).json(chatrooms);
      })
      .catch(err => console.log(err));
  }
);
router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.secret).sub;

      const user = await User.findById(decoded).select("-password");
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({error: "there was an error"})
    }
  }
);
module.exports = router;
