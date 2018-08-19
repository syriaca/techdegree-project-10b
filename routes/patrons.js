var express = require('express');
var router = express.Router();
var Patrons = require('../models').Patrons;

/* GET: Show all patrons list */
router.get('/', function(req, res, next) {
  Patrons.findAll().then(function(patrons) {
    res.render('patrons/index', {
      title: 'All patrons',
      patrons: patrons
    });
  });
});

/* GET: Show individual patron */
router.get('/details/:id', function(req, res, next) {
  Patrons.findById(req.params.id).then(function(patron) {
    res.render('patrons/details', {
      patron: patron
    });
  });
});

/* POST: Update patron details */
router.post('/:id', (req, res, next) => {
  Patrons
    .findById(req.params.id)
    .then(patron => {return patron.update(req.body);})
    .then(() => {res.redirect('/patrons/details/'+req.params.id);});
});

/* GET: Show patron creation form page */
router.get('/new', function(req, res, next) {
  res.render('patrons/new', { patron: Patrons.build(), title: 'New Patron' });
});

/* POST: Create a new patron */
router.post('/', function(req, res, next){
  Patrons.create(req.body).then(function(patron){
    res.redirect('/patrons/details/'+ patron.id);
  });
});

module.exports = router;
