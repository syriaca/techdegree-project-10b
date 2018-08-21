const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const op = sequelize.Op;
const moment = require('moment');
const Books = require('../models').Books;
const Loans = require('../models').Loans;
const Patrons = require('../models').Patrons;
let today = moment().format('YYYY-MM-DD');

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
      Loans
        .findAll({
          include: [{
            model: Patrons
          },
          {
            model: Books
          }],
          where: {
            book_id: req.params.id
          }
        })
        .then(loans => {
          if (book) {
            res.render('books/details', { 
              book: book,
              loans: loans
            });
          } else {
            res.send(404);
          }  
        })    
        .catch((err)=> {
          res.send(500);
        });
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
    .catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        res.render('books/new', { 
          book: Books.build(), 
          title: 'New Book',
          errors: err.errors
        });
      } else {
        throw err;
      }
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
    .catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        Loans
          .findAll({
            include: [{
              model: Patrons
            },
            {
              model: Books
            }],
            where: {
              book_id: req.params.id
            }
          })
          .then(loans => {
            let book =  Books.build(req.body);
            book.id = req.params.id;            
            res.render('books/details', {
                book: book, 
                loans: loans,
                errors: err.errors
            });
          })
      } else {
        throw err;
      }
    })
    .catch((err)=> {
      res.send(500);
    });
});

/* GET: Show overdue books list */
router.get('/overdue', (req, res, next) => {
  Books
    .findAll({
      include: [{
        model: Loans,
        where: {
          [op.and]: [{
            return_by: {
              [op.lt]: today
            },
            returned_on: {
              [op.eq]: null
            }
          }]
        }
      }]
    })
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
    .findAll({
      include: [{
        model: Loans,
        where: {
          loaned_on: {
            [op.ne]: null
          },
          returned_on: {
            [op.eq]: null
          }
        }
      }]
    })
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