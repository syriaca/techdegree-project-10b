const express = require('express');
const router = express.Router();
const Books = require('../models').Books;

/* GET: Show book list */
router.get('/', (req, res, next) => {
  Books
    .findAll()
    .then(books => {
    res.render('books/index', {
      title: 'All books', 
      page: req.baseUrl,
      books: books
    });
  });
});

/* GET: Show individual book details */
router.get('/details/:id', (req, res, next) => {
  Books
    .findById(req.params.id)
    .then(book => {
    res.render('books/details', { 
      book: book
    });
  });
});

/* GET: Show new book creation page */
router.get('/new', (req, res, next) => {
  res.render('books/new', { book: Books.build(), title: 'New Book' });
});

/* POST: Create a new Book */
router.post('/', (req, res, next) => {
  Books
    .create(req.body)
    .then(book => {
      res.redirect('/books/details/'+ book.id);
  });
});

/* POST: Update a book details */
  router.post('/:id', (req, res, next) => {
    Books
      .findById(req.params.id)
      .then(book => {
        return book.update(req.body);
      })
      .then(() => {
        res.redirect('/books/details/'+req.params.id)
      });
  });

/* GET: Show overdue books list */
router.get('/overdue', (req, res, next) => {
  Books
    .findAll()
    .then(books => {
    res.render('books/overdue', {
      title: 'Overdue Books',
      page: req.baseUrl,
      books: books
    });
  });
});

/* GET: Show checked out books list */
router.get('/checked_out', (req, res, next) => {
  Books
    .findAll()
    .then(books => {
    res.render('books/checked', {
      title: 'Checked Out Books',
      page: req.baseUrl,
      books: books
    });
  });
});

module.exports = router;