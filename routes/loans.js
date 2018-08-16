var express = require('express');
var router = express.Router();
var Loans = require('../models').Loans;

router.get('/', function(req, res, next) {
  Loans.findAll().then(function(loans) {
    res.render('loans', {
      title: 'All loans',
      page: req.baseUrl,
      loans: loans
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('loansNew', { title: 'New Loan' });
});

module.exports = router;
