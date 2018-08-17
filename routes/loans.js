var express = require('express');
var router = express.Router();
var Loans = require('../models').Loans;

// Route to list ALL Loans
router.get('/', function(req, res, next) {
  Loans.findAll().then(function(loans) {
    res.render('loans/index', {
      title: 'All loans',
      page: req.baseUrl,
      loans: loans
    });
  });
});

// Route to create a NEW Loan
router.get('loans/new', function(req, res, next) {
  res.render('loansNew', { title: 'New Loan' });
});

// Route to list OVERDUE Loans
// Route to list CHECKEDOUT Loans

module.exports = router;
