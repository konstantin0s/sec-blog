const express = require('express');
const router  = express.Router();
const cors = require('cors');
const Comment = require("../models/Comment")
const Article = require("../models/Article");



var allowedOrigins = ['https://zumbazomblog.herokuapp.com/'];
router.use(cors({
    credentials: true,
    origin: allowedOrigins
  }));
  

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