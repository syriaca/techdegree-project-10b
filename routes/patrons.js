var express = require('express');
var router = express.Router();
var Patrons = require('../models').Patrons;

router.get('/', function(req, res, next) {
  Patrons.findAll().then(function(patrons) {
    res.render('patrons', {
      title: 'All patrons',
      patrons: patrons
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('patronsNew', { title: 'New Patron' });
});

module.exports = router;
