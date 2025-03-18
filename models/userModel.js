const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // No need for hashing since bcrypt is not used
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
