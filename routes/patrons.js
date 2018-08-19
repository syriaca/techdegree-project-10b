const express = require('express');
const router = express.Router();
const Patrons = require('../models').Patrons;

/* GET: Show all patrons list */
router.get('/', (req, res, next) => {
  Patrons
    .findAll()
    .then(patrons => {
      res.render('patrons/index', {
        title: 'All patrons',
        patrons: patrons
      });
  });
});

/* GET: Show individual patron */
router.get('/details/:id', (req, res, next) => {
  Patrons
    .findById(req.params.id)
    .then(patron => {
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
router.get('/new', (req, res, next) => {
  res.render('patrons/new', { patron: Patrons.build(), title: 'New Patron' });
});

/* POST: Create a new patron */
router.post('/', (req, res, next) => {
  Patrons
    .create(req.body)
    .then(patron => {
    res.redirect('/patrons/details/'+ patron.id);
  });
});

module.exports = router;
