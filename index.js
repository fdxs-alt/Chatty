const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require("moment");
const socketioJWT = require("socketio-jwt");
const dotenv = require("dotenv");
const connectDB = require("./utils/connectDatabase");
const passport = require("passport");
const join = require("./socket/join");
const sendMessage = require("./socket/sendMessage");
const path = require("path");
const ErrorHandler = require("./utils/HandleErrors");
dotenv.config({ path: "./.env" });
require("./config/passport")(passport);

// bodyparser
app.use(express.json());
// connecting to database
connectDB();
app.use(passport.initialize());
// auth routes
app.use("/auth", require("./routes/AuthRoutes"));
app.use("/user", require("./routes/UserRoutes"));
io.use(
  socketioJWT.authorize({
    secret: process.env.secret,
    handshake: true,
  })
);
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    join(socket, name, room, callback);
    callback();
  });
  socket.on("sendMessage", (message, name, room, email, callback) => {
    sendMessage(message, io, callback, email, name, room);
    callback();
  });
  socket.on("disconnect", ({ name }) => {
    socket.emit("message", {
      issuedBy: "admin",
      content: `${name} has left the room`,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.use(ErrorHandler.handleError);
// listening
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`App working on port ${PORT}`);
});
