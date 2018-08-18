var express = require('express');
var router = express.Router();
var Patrons = require('../models').Patrons;

/* GET ALL Patrons list */
router.get('/', function(req, res, next) {
  Patrons.findAll().then(function(patrons) {
    res.render('patrons/index', {
      title: 'All patrons',
      patrons: patrons
    });
  });
});

/* GET ALL Patrons list */
router.get('/:id', function(req, res, next) {
  Patrons.findById(req.params.id).then(function(patron) {
    res.render('patrons/details', {
      patron: patron
    });
  });
});

/* GET New Patron creation page */
router.get('/new', function(req, res, next) {
  res.render('patrons/new', { title: 'New Patron' });
});

/* POST CREATE a new Patron */
router.post('/', function(req, res, next){
  Patrons.create(req.body).then(function(patron){
    res.redirect('/patrons/'+ patron.id);
  });
});

module.exports = router;
