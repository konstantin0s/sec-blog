const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Article schema
const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  imageUrl: { type: String,
     required: true,
  },
  owner: {type: Schema.Types.ObjectId,  //article owner
     ref: "User"},
  comments: [ {
      owner: {
        type: Schema.Types.ObjectId,
         ref: "User"
      },
      text: String
  }
  ],
  // likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],

  date: {
    type: Date,
    default: Date.now
  }
});

//adding comments
articleSchema.methods.comment = function(c) {
  this.comments.push(c);
  return this.save();
}

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
