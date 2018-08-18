var express = require('express');
var router = express.Router();
var Books = require('../models').Books;

/* GET all books list */
router.get('/', function(req, res, next) {
  Books.findAll().then(function(books){
    res.render('books/index', { 
      title: 'All books', 
      page: req.baseUrl,
      books: books
    });
  });
});

/* GET individual book details */
router.get('/:id', function(req, res, next) {
  Books.findById(req.params.id).then(function(book){
    res.render('books/details', { 
      book: book
    });
  });
});

/* GET Create a NEW Book */
router.get('/new', function(req, res, next) {
  res.render('books/new', { title: 'New Book' });
});

/* POST Create a NEW Book */
router.post('/', function(req, res, next){
  Books.create(req.body).then(function(book){
    res.redirect('/books/'+ book.id);
  });
});

/* GET Show overdue Book list */
router.get('/overdue', function(req, res, next) {
  Books.findAll().then(function(books){
    res.render('books/overdue', {
      title: 'Overdue Books',
      page: req.baseUrl,
      books: books
    });
  });
});

/* GET Show checkoud out Book list */
router.get('/checked_out', function(req, res, next) {
  Books.findAll().then(function(books){
    res.render('books/checked', {
      title: 'Checked Out Books',
      page: req.baseUrl,
      books: books
    });
  });
});

module.exports = router;
