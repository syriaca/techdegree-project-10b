const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const op = sequelize.Op;
const moment = require('moment');
const Books = require('../models').Books;
const Loans = require('../models').Loans;
const Patrons = require('../models').Patrons;
let today = moment().format('YYYY-MM-DD');

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
      Loans
      .findAll({
        include: [{
          model: Patrons
        },
        {
          model: Books
        }],
        where: {
          patron_id: req.params.id
        }
      })
      .then(loans => {
        if(patron) {
          res.render('patrons/details', {
            patron: patron,
            loans: loans
          });
        } else {
          res.send(404);
        }  
      })    
      .catch((err)=> {
        res.send(500);
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
      res.redirect('/patrons');
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
        Loans
          .findAll({
            include: [{
              model: Patrons
            },
            {
              model: Books
            }],
            where: {
              book_id: req.params.id
            }
          })
          .then(loans => {
            let patron =  Patrons.build(req.body);
            patron.id = req.params.id;
    
            res.render('patrons/details', {
                patron: patron,
                loans: loans,
                errors: err.errors
            });
          })      
      } else {
        throw err;
      }
    })
    .catch((err)=> {
      res.send(500);
    });
});

module.exports = router;
