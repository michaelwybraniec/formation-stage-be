var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: {
    type: String,
    required: true
  },
  dateofbirth: {
    type: Date,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  autoCreate: true
});

userSchema.plugin(uniqueValidator);

var User = mongoose.model('user', userSchema);

module.exports = User;
 