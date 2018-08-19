var express = require('express');
var router = express.Router();
var Books = require('../models').Books;

/* GET: show book list */
router.get('/', function(req, res, next) {
  Books.findAll().then(function(books){
    res.render('books/index', { 
      title: 'All books', 
      page: req.baseUrl,
      books: books
    });
  });
});

/* GET: Show individual book details */
router.get('/details/:id', function(req, res, next) {
  Books.findById(req.params.id).then(function(book){
    res.render('books/details', { 
      book: book
    });
  });
});

/* GET: Show new book creation page */
router.get('/new', function(req, res, next) {
  res.render('books/new', { book: Books.build(), title: 'New Book' });
});

/* POST: Create a new Book */
router.post('/', function(req, res, next){
  Books.create(req.body).then(function(book){
    res.redirect('/books/details/'+ book.id);
  });
});

/* POST: Update a book details */
  router.post('/:id', (req, res, next) => {
    Books
      .findById(req.params.id)
      .then(function(book){
        return book.update(req.body);
      })
      .then(function(){
        res.redirect('/books/details/'+req.params.id)
      });
  });

/* GET: Show overdue books list */
router.get('/overdue', function(req, res, next) {
  Books.findAll().then(function(books){
    res.render('books/overdue', {
      title: 'Overdue Books',
      page: req.baseUrl,
      books: books
    });
  });
});

/* GET => Show checked out books list */
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
