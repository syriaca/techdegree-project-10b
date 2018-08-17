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
  });
});

// Route to create a NEW Books
router.get('/new', function(req, res, next) {
  res.render('books/new', { title: 'New Book' });
});

// Create a new BOOK
router.post('/', function(req, res, next){
  Books.create(req.body).then(function(book){
    res.redirect('/books/'+ book.id);
  });
});

// Route to list OVERDUE Books
router.get('/?filter=overdue', function(req, res, next) {
  Books.findAll().then(function(books){
    res.render('books/overdue', {
      title: 'Overdue Books',
      books: books
    });
  });
});

// Route to list CHECKEDOUT Books
module.exports = router;
