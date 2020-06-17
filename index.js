const express = require('express');
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const dotenv = require('dotenv')
const connectDB = require('./utils/connectDatabase')
const passport = require('passport');
dotenv.config({ path: "./.env" });
require('./config/passport')(passport);

// bodyparser
app.use(express.json())
// connecting to database
connectDB();
app.use(passport.initialize());
// auth routes 
app.use('/auth', require('./routes/AuthRoutes'))

// listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`App working on port ${PORT}`)
})