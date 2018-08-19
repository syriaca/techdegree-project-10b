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
