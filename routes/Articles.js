const express = require('express');
const router = express.Router();
require("dotenv").config();

//bring in models
const Article = require('../models/Article');

//@route Get Articles @desc All Articles
router.get('/', (req, res) => {
    Article
        .find()
        .sort({date: -1})
        .then(articles => res.send(articles));
        // .then(articles => res.json(articles));
});

router.get('/:userId/', (req, res) => {
    // debugger
    Article
        .find({user: req.query.userId})
        .then(articles => {
            res.send(articles);
            // res.json(articles);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/', (req, res, next) => {
    // debugger
    return Article
        .find()
        .populate('owner')
        .sort({createdAt: 'descending'})
        .then((articles) => res.send(articles))
        // .then((articles) => res.json({
        //     articles: articles.map(article => article.toJSON())
        // }))
        .catch(next);
});

router.get("/one/:id", (req, res) => {
    // debugger
    Article
        .findById(req.params.id)
        .populate("owner")
        .populate('comments.owner', 'first_name')
        .then((result) => {
            // debugger
            res
                .status(200)
                res.send(result)
                // .json(result);
        })
        .catch((error) => {
            res
                .status(500)
                .json(error);
            // debugger
        });
});

//add submit POST route
router.post('/', (req, res) => {
    // debugger
    const today = new Date();
    const newArticle = new Article({title: req.body.title, body: req.body.body, 
      imageUrl: req.body.imageUrl, owner: req.body.userId, created: today});
    newArticle
        .save()
        .then(article => res.send(article))
        // .then(article => res.json(article))
        .catch(err => {
            res.json(err);
        });
});

//add Submit POST comment route
router.post('/savecomment', (req, res) => {

    const request = req.body;
    const id = request.id;

    Article
        .findByIdAndUpdate(id)
        .exec((err, article) => {
            if (err) {
                res
                    .status(500)
                    .json(err);
            }
            article
                .comment({owner: req.session.currentUser, text: request.text, date: request.date})
                .then(() => {
                    Article
                        .findById(id)
                        .populate("owner")
                        .populate('comments.owner', 'first_name')
                        .exec()
                        .then(newArticle => {
                            res
                                .status(200)
                                .send(newArticle);
                                // .json(newArticle);
                        })
                })
                .catch(err => {
                    res
                        .status(500)
                        .json(err);
                });
        });
});

//Edit single Article
router.put('/one/:id', function (req, res, next) {
    Article
        .findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) 
                return next(err);
                res.send(post);
            // res.json(post);
        });
});

//@route Delete Article
router.delete('/:id', (req, res) => {
    Article
        .findById(req.params.id)
        .then(article => article.remove().then(() => res.json({success: true})))
        .catch(err => res.status(500).json(err));
});

module.exports = router;