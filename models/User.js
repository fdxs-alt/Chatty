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

UserSchema.methods.setPassword = async () => {
  if (this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    } catch (err) {
      console.log(err);
    }
  }
};
UserSchema.methods.validatePassword = async password => {
  try {
    const isMatch = bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    console.log(error)
  }
};
UserSchema.methods.createJWT = () => {
    return jwt.sign({
        email: this.email,
        id: this._id,
    }, process.env.secret, {expiresIn: 3600})
}

UserSchema.methods.toAuthJwt = () => {
    return {
        _id: this._id,
        email: this.email,
        token: this.createJWT()
    }
}

module.exports = mongoose.model("User", UserSchema);
