const express = require('express')
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./utils/connectDatabase')
dotenv.config({ path: "./.env" });

// bodyparser
app.use(express.json())

// connecting to database
connectDB();

// auth routes 
app.use('/auth', require('./routes/AuthRoutes'))

// listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App working on port ${PORT}`)
})