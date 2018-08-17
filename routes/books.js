var express = require('express');
var router = express.Router();
var Books = require('../models').Books;

// Route to list ALL books
router.get('/', function(req, res, next) {
  Books.findAll().then(function(books){
    res.render('books/index', { 
      title: 'All books', 
      page: req.baseUrl,
      books: books
    });
    console.log(books);
  });
});


// Route to create a NEW Books
router.get('/new', function(req, res, next) {
  res.render('books/new', { title: 'New Book' });
});

// Route to list OVERDUE Books
// Route to list CHECKEDOUT Books
module.exports = router;
