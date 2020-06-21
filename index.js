const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const socketioJWT = require("socketio-jwt");
const dotenv = require("dotenv");
const connectDB = require("./utils/connectDatabase");
const passport = require("passport");
const User = require("./models/User");
const ChatRoom = require("./models/ChatRoom");
const jwt = require("jsonwebtoken");

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
io.sockets
  .on(
    "connect",
    socketioJWT.authorize({
      secret: process.env.secret
    })
  )
  .on("authenticated", async socket => {
    socket.on("join", ({ name, room }, callback) => {
      
    });
    socket.on("disconnect", ({ user }) => {
      socket.emit("message", {
        user: "admin",
        content: `${user} has left the room`
      });
    });
  });

// listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`App working on port ${PORT}`);
});
