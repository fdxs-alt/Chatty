const express = require("express");
const router = express.Router();
const User = require("../models/User");
const emailValidator = require("email-validator");
const passport = require("passport");
require('../config/passport')
router.post("/register", (req, res) => {
  const { email, nick, password } = req.body;

  if (!email || !nick || !password)
    return res.status(400).json({ error: "Fill all gaps" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  if (!emailValidator.validate(email))
    return res.status(400).json({ error: "Email adress doesn't exist" });
  User.findOne({ nick }).then(user => {
    if (user) return res.status(400).json({ error: "Nick is already taken" });
    User.findOne({ email })
      .then(user => {
        if (user) return res.status(400).json({ error: "User already exists" });
        const newUser = new User({
          nick,
          email,
          password
        });
        newUser
          .save()
          .then(() =>
            res.json({ message: "User's been registered sucessfully" })
          )
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Fill all cridentials" });
  User.findOne({ email })
    .then(user => {
      if (!user)
        return res
          .status(400)
          .json({ error: "Password or email doesn't match" });
      user.validatePassword(password).then(isMatch => {
        if (!isMatch)
          return res
            .status(400)
            .json({ error: "Password or email doesn't match" });
        res
          .status(200)
          .json({ message: "You're logged in", data: user.toAuthJwt() });
      });
    })
    .catch(error => console.log(error));
});
module.exports = router;
