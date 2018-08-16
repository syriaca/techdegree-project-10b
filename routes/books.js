var express = require('express');
var router = express.Router();
var Books = require('../models').Books;

router.get('/', function(req, res, next) {
  Books.findAll().then(function(books){
    res.render('books', { 
      title: 'All books', 
      page: req.baseUrl,
      books: books
    });
    console.log(books);
  });
});

router.get('/new', function(req, res, next) {
  res.render('booksNew', { title: 'New Book' });
});

module.exports = router;
