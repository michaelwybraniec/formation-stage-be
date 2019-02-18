var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  datePosted: {
    type: Date,

  },
  content: {
    type: String,
    required: true
  },
  likersIds: [mongoose.Schema.Types.ObjectId],
  poopsIds: [mongoose.Schema.Types.ObjectId],
},{
    autoCreate: true
  });

userSchema.plugin(uniqueValidator);

var Article = mongoose.model('article', userSchema);

module.exports = Article;
