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
  // ownerName: {
  //   type: String,
  // }
  // color: {
  //   type: String
  // }
  content: {
    type: String,
    required: true
  }, 
}, {
  autoCreate: true
});

userSchema.plugin(uniqueValidator);

var Article = mongoose.model('article', userSchema);

module.exports = Article;
