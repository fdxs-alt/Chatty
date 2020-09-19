const HttpException = require("../utils/HttpException");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/confirmMail");
const emailValidator = require("email-validator");
const bcrypt = require("bcryptjs");
const { resetPassword } = require("../utils/resetPassword");
const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    const { email, nick, password } = req.body;

    if (!email || !nick || !password) {
      return next(new HttpException(400, "Fill all gaps"));
    }

    if (password.length < 6) {
      return next(
        new HttpException(400, "Password must be at least 6 characters")
      );
    }

    if (nick.length < 4) {
      return next(new HttpException(400, "Nick must be at least 4 characters"));
    }

    if (nick.length > 10)
      return next(
        new HttpException(400, "Nick can't be longer than 10 characters")
      );

    if (!emailValidator.validate(email)) {
      return next(new HttpException(400, "Email adress doesn't exist"));
    }

    const userWithNick = await User.findOne({ nick });

    if (userWithNick) {
      return next(new HttpException(400, "Nick is already taken"));
    }

    const userWithEmail = await User.findOne({ email });

    if (userWithEmail) {
      return next(new HttpException(400, "User already exists"));
    }

    const newUser = new User({
      nick,
      email,
      password,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ message: "User's been registered sucessfully" });
  } catch (error) {
    return next(new HttpException(500, error));
  }
};

const confirm = async (req, res, next) => {
  const { token } = req.params;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.secret);
  } catch (error) {
    return next(new HttpException(401, "You can't verify account now"));
  }

  try {
    const user = await User.findOne({ email: decoded });

    if (user.confirmed) {
      return next(new HttpException(400, "Account has already been confirmed"));
    }

    await User.findOneAndUpdate({ email: decoded }, { confirmed: true });
    return res
      .status(200)
      .json({ message: "User's been confirmed sucessfully" });
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HttpException(400, "Fill all cridentials"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new HttpException(400, "Password or email doesn't match"));
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return next(new HttpException(400, "Password or email doesn't match"));
    }

    return res
      .status(200)
      .json({ message: "You're logged in", data: user.toAuthJwt() });
  } catch (error) {
    return next(new HttpException(500, error));
  }
};
const recoverPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "There's no such account" });

    const token = jwt.sign({ email }, process.env.secret, {
      expiresIn: 600,
    });

    await resetPassword(token, user.email);
    return res
      .status(200)
      .json({ message: "Link to reset has been send sucessfully" });
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};
const reset = async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.secret);
  } catch (error) {
    return next(new HttpException(400, "Changing password is impossible"));
  }

  if (!decoded) {
    return next(new HttpException(400, "Changing password is impossible"));
  }

  if (password !== confirmPassword) {
    return next(new HttpException(400, "Passwords don't match each other"));
  }

  if (password.length < 6) {
    return next(
      new HttpException(400, "Password must be at least 6 characters")
    );
  }

  try {
    const newPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email: decoded.email },
      { password: newPassword }
    );

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};
const resend = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = User.findOne({ email });
    if (!user) {
      return next(new HttpException(400, "Can't verify user"));
    }

    if (user.confirmed) {
      return next(new HttpException(400, "Account has already been verified"));
    }

    const token = jwt.sign(user.email, process.env.secret);

    await sendEmail(token, user.email);

    return res.status(200).json({ message: "Email send sucessfully" });
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};
module.exports = {
  register,
  confirm,
  login,
  recoverPassword,
  reset,
  resend,
};
