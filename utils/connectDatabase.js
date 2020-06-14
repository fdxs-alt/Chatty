const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to database")
  } catch (error) {
      console.log(error.message)
  }
};
