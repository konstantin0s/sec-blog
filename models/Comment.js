const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  comment: String,
  article: {type: Schema.Types.ObjectId, ref: 'Article'},
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;