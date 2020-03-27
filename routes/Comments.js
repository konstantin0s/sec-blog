const express = require('express');
const router  = express.Router();
const cors = require('cors');
const Comment = require("../models/Comment")
const Article = require("../models/Article");



var whitelist = ['http://locahost:3001', 'https://zumbazomblog.herokuapp.com/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

router.options('*', cors(corsOptionsDelegate))

router.post('/comments', (req, res, next)=>{
  
    Comment.create({
        comment: req.body.comment,  
        user: req.session.currentUser._id
    })
    .then(response => {
        Article.findByIdAndUpdate(req.body.articleId, { $push:{ comments: response._id } })
        .then(theResponse => {
            res.json(theResponse);
        })
        .catch(err => {
        res.json(err);
    })
    })
    .catch(err => {
        res.json(err);
    })
})

module.exports = router