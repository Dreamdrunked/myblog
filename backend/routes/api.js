const express = require('express');
const router = express.Router();
const { 
    getArticles, 
    getArticle, 
    createArticle 
} = require('../controllers/articleController');

router.route('/articles')
    .get(getArticles)
    .post(createArticle);

router.route('/articles/:id')
    .get(getArticle);

module.exports = router; 