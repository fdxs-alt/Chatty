const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const socketioJWT = require("socketio-jwt");
const dotenv = require("dotenv");
const connectDB = require("./utils/connectDatabase");
const passport = require("passport");
const User = require("./models/User");
const ChatRoom = require('./models/ChatRoom')
dotenv.config({ path: "./.env" });
require("./config/passport")(passport);

// bodyparser
app.use(express.json());
// connecting to database
connectDB();
app.use(passport.initialize());
// auth routes
app.use("/auth", require("./routes/AuthRoutes"));

io.use(
  socketioJWT.authorize({
    secret: process.env.secret,
    handshake: true
  })
);
io.on("connection", socket => {
  User.findById(socket.decoded_token.sub).then(user => console.log(user.nick));

  socket.on('join', ({name, room}, callback) => {
    console.log(name,room)
  })
  socket.on('disconnect', () => {
      console.log('User had left')
  })
});

// listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`App working on port ${PORT}`);
});
