var express = require('express');
var router = express.Router();
var Patrons = require('../models').Patrons;

// Route to list ALL Patrons
router.get('/', function(req, res, next) {
  Patrons.findAll().then(function(patrons) {
    res.render('patrons/index', {
      title: 'All patrons',
      patrons: patrons
    });
  });
});

// Route to create a NEW Patron
router.get('/new', function(req, res, next) {
  res.render('patrons/new', { title: 'New Patron' });
});

module.exports = router;
