// TODO: PATRON DETAIL PAGE
// 1) Shows a Loan History table
// 2) Each entry in the loans table should have links to books, patrons and if the book is checked out, the link to the return book page.

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
    })
    .catch((err)=> {
      res.send(500);
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
    })
    .catch((err)=> {
      res.send(500);
    });
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
    })
    .catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        res.render('patrons/new', { 
          patron: Patrons.build(), 
          title: 'New Patron',
          errors: err.errors
        });
      } else {
        throw err;
      }
    })
    .catch((err)=> {
      res.send(500);
    });
});

/* POST: Update patron details */
router.post('/:id', (req, res, next) => {
  Patrons
    .findById(req.params.id)
    .then(patron => {
      if (patron) {
        return patron.update(req.body);
      } else {
        res.send(404);
      }
    })
    .then(() => {
      res.redirect('/patrons/details/'+req.params.id);
    })    
    .catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        let patron =  Patrons.build(req.body);
        patron.id = req.params.id;

        res.render('patrons/details', {
            patron: patron, 
            errors: err.errors
        });
      } else {
        throw err;
      }
    })
    .catch((err)=> {
      res.send(500);
    });
});

module.exports = router;
