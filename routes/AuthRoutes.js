const express = require("express");
const router = express.Router();
const User = require("../models/User");
const emailValidator = require("email-validator");
const { resetPassword } = require("../utils/resetPassword");
const { sendEmail } = require("../utils/confirmMail");
const jwt = require("jsonwebtoken");
require("../config/passport");
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
          .then(() => {
            const token = newUser.createJWT();
            sendEmail(token, newUser.email);
            res
              .status(200)
              .json({ message: "User's been registered sucessfully" });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  });
});
router.post("/confirm/:token", (req, res) => {
  const { token } = req.params;
  decoded = jwt.verify(token, process.env.secret);
  if (!decoded) return res.status(400).json({ error: "Can't verify user" });
  User.findByIdAndUpdate(decoded.sub, { confirmed: true }, (err, upadated) => {
    if (err) return res.status(400).json({ error: err });
    res.status(200).json({ message: "Your account has been verified" });
  });
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ error: "Fill all cridentials" });
  User.findOne({ email })
    .then(user => {
      if (!user)
        return res
          .status(401)
          .json({ error: "Password or email doesn't match" });
      if (!user.confirmed)
        return res.status(401).json({ error: "Confirm your email first!" });
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
router.post("/recoverpassword", (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) res.status(400).json({ error: "There's no such account" });
    const token = user.createJWT();
    resetPassword(token, user.email).catch(error =>
      res.status(500).json({ error })
    );
    res
      .status(200)
      .json({ message: "Link to reset has been send sucessfully" });
  });
});
module.exports = router;
