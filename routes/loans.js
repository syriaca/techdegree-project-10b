var express = require('express');
var router = express.Router();
var Books = require('../models').Books;
var Loans = require('../models').Loans;
var Patrons = require('../models').Patrons;

/* GET All loans */
router.get('/', function(req, res, next) {
  Loans.findAll({order:[['loaned_on',"DESC"]]}).then(function(loans) {
    res.render('loans/index', {
      title: 'All loans',
      page: req.baseUrl,
      loans: loans
    });
  });
});

/* GET new loan */
router.get('/new', function(req, res, next) {
  Books.findAll().then(function(books) {
    Patrons.findAll().then(function(patrons) {
      res.render('loans/new', {
        title: 'New loans',
        page: req.baseUrl,
        books: books,
        patrons: patrons
      });
    });
  });
});

/* POST create new loan */
router.post('/', function(req, res, next) {
  console.log(req.body.loaned_on);
  Loans.create(req.body).then(function(loans) {
    res.redirect('/loans');
  });
});

/* GET overdue loan */
router.get('/overdue', function(req, res, next) {
  Loans.findAll().then(function(loans) {
    res.render('loans/index', {
      title: 'Overdue loans',
      page: req.baseUrl,
      loans: loans
    });
  });
});

/* GET checked_out loan */
router.get('/checked', function(req, res, next) {
  Loans.findAll().then(function(loans) {
    res.render('loans/index', {
      title: 'Checked out loans',
      page: req.baseUrl,
      loans: loans
    });
  });
});

module.exports = router;
