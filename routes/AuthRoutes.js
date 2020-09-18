const express = require("express");
const router = express.Router();
const User = require("../models/User");
const emailValidator = require("email-validator");
const { resetPassword } = require("../utils/resetPassword");
const { sendEmail } = require("../utils/confirmMail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("../config/passport");
router.post("/register", (req, res) => {
  const { email, nick, password } = req.body;

  if (!email || !nick || !password)
    return res.status(400).json({ error: "Fill all gaps" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  if (nick.length < 4)
    return res
      .status(400)
      .json({ error: "Nick must be at least 4 characters" });
  if (nick.length > 8)
    return res
      .status(400)
      .json({ error: "Nick can't be longer than 8 characters" });
  if (!emailValidator.validate(email))
    return res.status(400).json({ error: "Email adress doesn't exist" });
  User.findOne({ nick }).then((user) => {
    if (user) return res.status(400).json({ error: "Nick is already taken" });
    User.findOne({ email })
      .then((user) => {
        if (user) return res.status(400).json({ error: "User already exists" });
        const newUser = new User({
          nick,
          email,
          password,
        });

        newUser
          .save()
          .then(() => {
            const token = jwt.sign(newUser.email, process.env.secret);
            sendEmail(token, newUser.email).then(() =>
              res
                .status(200)
                .json({ message: "User's been registered sucessfully" })
            );
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  });
});
router.post("/confirm/:token", (req, res) => {
  const { token } = req.params;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.secret);
  } catch (error) {
    return res.status(400).json({ error: "You can't verify account now" });
  }
  User.findOne({ email: decoded })
    .then((user) => {
      if (user.confirmed)
        return res.status(400).json({
          confirmed: true,
          error: "Your account has already been confirmed",
        });
      User.findOneAndUpdate(
        { email: decoded },
        { confirmed: true },
        (err, upadated) => {
          if (err) return res.status(400).json({ error: err });
          res.status(200).json({ message: "Your account has been verified" });
        }
      );
    })
    .catch((err) => console.log(err));
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ error: "Fill all cridentials" });
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ error: "Password or email doesn't match" });

      user.validatePassword(password).then((isMatch) => {
        if (!isMatch)
          return res
            .status(400)
            .json({ error: "Password or email doesn't match" });
        res
          .status(200)
          .json({ message: "You're logged in", data: user.toAuthJwt() });
      });
    })
    .catch((error) => console.log(error));
});
router.post("/recoverpassword", (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({ error: "There's no such account" });
    const token = jwt.sign({ email }, process.env.secret, {
      expiresIn: 600,
    });
    resetPassword(token, user.email).catch((error) =>
      res.status(500).json({ error })
    );
    res
      .status(200)
      .json({ message: "Link to reset has been send sucessfully" });
  });
});
router.post("/reset/:token", async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.secret);
  } catch (error) {
    return res.status(401).json({ error: "Changing password is impossible" });
  }
  if (!decoded) return res.status(400).json({ error: "Can't verify user" });
  if (password !== confirmPassword)
    return res.status(400).json({ error: "Passwords don't match each other" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  try {
    const newPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email: decoded.email },
      { password: newPassword }
    );
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post("/resend", (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ error: "Can't verfiy user" });
    if (user.confirmed)
      return res
        .status(400)
        .json({ error: "Account has already been verified" });
    const token = jwt.sign(user.email, process.env.secret);
    sendEmail(token, user.email).then(() => {
      res.status(200).json({ message: "Email send sucessfully" });
    });
  });
});
module.exports = router;
