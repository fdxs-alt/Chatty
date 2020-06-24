const mongoose = require("mongoose");

module.exports = async function () {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Connected to database")
  } catch (error) {
      console.log(error.message)
  }
}
