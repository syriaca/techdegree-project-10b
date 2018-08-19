
// TODO: LOANS LISTING PAGE
// 1) Includes option to filter books by “Overdue”, and “Checked Out”
// 2) The “patron” field links to the patron who checked out the book
// 3) If the book is checked out, the “Action” column contains a link to return the book

// TODO: NEW LOAN PAGE
// 1) “Loaned on” is pre-populated with today’s date, 
//    in YYYY-MM-DD format. “Return by” is 7 days in the future.
// 2) When the form is submitted successfully, a loan is created in the database 
//      and the user should be redirected to the loan listing page.
// 3) An error is displayed if the form is submitted with blank or invalid data 

// TODO: RETURN BOOK PAGE
// 1) Make pug view & route
// 2) Displays book title, the patron who borrowed the book, the loaned on and return by dates.
// 3) Has the “Returned on” field pre-populated with today’s date.
// 4) Includes a button to return the book
// 5) When the form is submitted successfully, the loan should be updated in the database
//    and the page should redirect to the loans listing page.
// 6) An error is displayed if the form is submitted with blank or invalid 
//    data in required fields. For example: “This field is required.”





const express = require('express');
const router = express.Router();
const Books = require('../models').Books;
const Loans = require('../models').Loans;
const Patrons = require('../models').Patrons;

/* GET: All loans list */
router.get('/', (req, res, next) => {
  Loans
    .findAll({order:[['loaned_on',"DESC"]]})
    .then(loans => {
      res.render('loans/index', {
        title: 'All loans',
        page: req.baseUrl,
        loans: loans
      });
    });
});

/* GET: Show view to create a new loan */
router.get('/new', (req, res, next)=> {
  Books
    .findAll()
    .then(books => {
    Patrons
      .findAll()
      .then(patrons => {
        res.render('loans/new', {
          title: 'New loans',
          page: req.baseUrl,
          books: books,
          patrons: patrons
        });
      });
  });
});

/* POST: Create new loan */
router.post('/', (req, res, next) => {
  Loans
    .create(req.body)
    .then(() => {
      res.redirect('/loans');
    });
});

/* GET: Overdue loan */
router.get('/overdue', (req, res, next) => {
  Loans
    .findAll()
    .then(loans => {
      res.render('loans/index', {
        title: 'Overdue loans',
        page: req.baseUrl,
        loans: loans
      });
    });
});

/* GET: Checked_out loan */
router.get('/checked_out', (req, res, next) => {
  Loans
    .findAll()
    .then(loans => {
      res.render('loans/checked', {
        title: 'Checked out loans',
        page: req.baseUrl,
        loans: loans
      });
    });
});

module.exports = router;
