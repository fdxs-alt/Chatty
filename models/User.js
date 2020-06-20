const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  nick: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    default: Date.now(),
    type: Date
  },
  confirmed: {
    default: false,
    type: Boolean
  }
});

UserSchema.pre("save", function(next) {
  if(!this.isModified("password")) {
      return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
UserSchema.methods.validatePassword = async function(password) {
  try {
    const isMatch = bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    console.log(error)
  }
};
UserSchema.methods.createJWT = function() {
    return jwt.sign({
        sub: this._id
    }, process.env.secret, {expiresIn: 3600})
}

UserSchema.methods.toAuthJwt = function() {
  return {
    _id: this._id,
    email: this.email,
    nick: this.nick,
    date: this.date,
    token: "Bearer " + this.createJWT(),
  };
}

module.exports = mongoose.model("User", UserSchema);
