const express = require('express');
const router  = express.Router();
const Comment = require("../models/Comment")
const Article = require("../models/Article");



router.post('/comments', (req, res, next)=>{
  
    Comment.create({
        comment: req.body.comment,  
        user: req.session.currentUser._id
    
    })
    .then(response => {
        console.log('body comment', req.body.comment);
        console.log('user id ?', user);
        Article.findByIdAndUpdate(req.body.articleId, { $push:{ comments: response._id } })
        .then(theResponse => {
            res.json(theResponse);
            console.log('respinse', theResponse)
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