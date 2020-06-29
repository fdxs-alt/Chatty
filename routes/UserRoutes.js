const express = require("express");
const router = express.Router();
const passport = require("passport");
const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
      res.status(401).json({ error: "there was an error" });
    }
  }
);
router.get(
  "/getMessages/:room",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { room } = req.params;
    ChatRoom.findOne({ name: room })
      .select("-password")
      .then(chatroom => {
        if (!chatroom)
          return res.status(404).json({ error: "Can't find such a room" });
        res.status(200).json(chatroom);
      });
  }
);
router.post(
  "/addRoom",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { chatroom, user } = req.body;
    if (!chatroom)
      return res
        .status(400)
        .json({ error: "You need to specify the name of the chat" });
    ChatRoom.findOne({ name: chatroom }).then(room => {
      if (room) res.status(400).json({ error: "This name is already taken" });
      const newRoom = new ChatRoom({
        name: chatroom,
        users: user
      });
      newRoom
        .save()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    });
  }
);
router.post(
  "/changepassword/:userID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { userID } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ error: "Passwords don't match each other" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    try {
      const newPassword = await bcrypt.hash(password, 10);
      User.findByIdAndUpdate(userID, { password: newPassword });
      return res.status(200).json({message: "Password changed successfully"})
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
module.exports = router;
