// TODO: BOOKS LISTING PAGE
// 1) Includes option to filter books by “Overdue”, and “Checked Out”

// TODO: NEW BOOK PAGE
// 1) An error is displayed if the form is submitted with blank or invalid data 
//    in required fields. For example: “This field is required.”

// TODO: BOOK DETAIL PAGE
// 1) Contains a Loan History table with the following columns: book name, patron, loaned on, return by, returned on and action.
// 2) If the book is checked out, the “Action” column contains a link to return the book
// 3) An error is displayed if the form is submitted with blank or invalid data 
//    in required fields. For example: “This field is required.”

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
    })
    .catch((err)=> {
      res.send(500);
    });
});

/* GET: Show individual book details */
router.get('/details/:id', (req, res, next) => {
  Books
    .findById(req.params.id)
    .then(book => {
      if (book) {
        res.render('books/details', { 
          book: book
        });
      } else {
        res.send(404);
      }  
    })
    .catch((err)=> {
      res.send(500);
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
    })
    .catch((err)=> {
      res.send(500);
    });
});

/* POST: Update a book details */
router.post('/:id', (req, res, next) => {
  Books
    .findById(req.params.id)
    .then(book => {
      if (book) {
        return book.update(req.body);
      } else {
        res.send(404);
      }
    })
    .then(() => {
      res.redirect('/books/details/'+req.params.id)
    })
    .catch((err)=> {
      res.send(500);
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
    })
    .catch((err)=> {
      res.send(500);
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
    })
    .catch((err)=> {
      res.send(500);
    });
});

module.exports = router;