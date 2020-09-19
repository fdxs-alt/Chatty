const ChatRoom = require("../models/ChatRoom");
const HttpException = require("../utils/HttpException");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getAllChatrooms = async (req, res, next) => {
  try {
    const chatrooms = await ChatRoom.find();
    res.status(200).json(chatrooms);
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};

const getUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  if (!token) {
    return next(new HttpException(401, "User unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.secret);

    if (!decoded.hasOwnProperty("sub")) {
      return next(new HttpException(401, "User unauthorized"));
    }

    const user = await User.findById(decoded.sub).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    return next(new HttpException(401, "User unauthorized"));
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { room } = req.params;
    const chatroom = await ChatRoom.findOne({ name: room }).select("-password");

    if (!chatroom) {
      return next(new HttpException(400, "Can't find such a room"));
    }

    return res.status(200).json(chatroom);
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};
const addRoom = async (req, res, next) => {
  try {
    const { chatroom, user, email } = req.body;

    if (!chatroom) {
      return next(
        new HttpException(500, "You need to specify the name of the chat")
      );
    }

    const isRoomNameTaken = await ChatRoom.findOne({ name: chatroom });

    if (isRoomNameTaken) {
      new HttpException(400, "This name is already taken");
    }

    const newRoom = new ChatRoom({
      name: chatroom,
      founder: email,
      users: user,
    });

    const result = await newRoom.save();

    return res.status(201).json(result);
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};

const changePassword = async (req, res, next) => {
  const { userID } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return next(new HttpException(400, "Passwords don't match each other"));

  if (password.length < 6)
    return next(
      new HttpException(400, "Password must be at least 6 characters")
    );

  try {
    const newPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(userID, { password: newPassword });

    return res.status(201).json({ message: "Password changed successfully" });
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};

const getPaginatedMessages = async (req, res, next) => {
  const { roomName, page_number } = req.params;

  const page = parseInt(page_number);
  try {
    const chatroom = await ChatRoom.findOne({ name: roomName });

    if (!chatroom)
      return next(new HttpException(400, "Can't find such a room"));

    const allMessages = chatroom.messages.slice(
      chat.messages.length - (page + 1) * 10,
      chat.messages.length - page * 10
    );

    if (allMessages) {
      return res.status(200).json(allMessages);
    } else {
      return next(
        new HttpException(400, "No items with the specified parameters")
      );
    }
  } catch (error) {
    return next(new HttpException(500, error));
  }
};

const chageNick = async (req, res, next) => {
  const { userID } = req.params;
  const { nick } = req.body;

  if (nick.length < 4) {
    return next(
      new HttpException(400, "Nickname must be at least 4 characters")
    );
  }

  if (nick.length > 10) {
    return next(
      new HttpException(400, "Nickname can't be longer than 10 characters")
    );
  }

  try {
    const user = await User.findOne({ nick });

    if (user) {
      return next(
        new HttpException(400, "User with passed nickname already exists")
      );
    }
    await User.findByIdAndUpdate(userID, { nick });

    return res
      .status(201)
      .json({ message: "You've changed your nick successfully" });
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};
const deleteRoom = async (req, res, next) => {
  try {
    const result = await ChatRoom.findByIdAndDelete(req.params.roomID);
    return res.status(200).json(result);
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};
const deleteAccount = async (req, res, next) => {
  const { userID } = req.params;

  try {
    await User.findByIdAndDelete(userID);
    return res.status(200).json({ message: "Account has been deleted" });
  } catch (error) {
    return next(new HttpException(500, "An error occured"));
  }
};
module.exports = {
  getAllChatrooms,
  getUser,
  getMessages,
  addRoom,
  changePassword,
  getPaginatedMessages,
  deleteRoom,
  chageNick,
  deleteAccount,
};
