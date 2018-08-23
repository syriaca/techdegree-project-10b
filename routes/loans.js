// TODO: NEW LOAN PAGE
// 2) When the form is submitted successfully, a loan is created in the database 
//      and the user should be redirected to the loan listing page.
// 3) An error is displayed if the form is submitted with blank or invalid data 

// TODO: RETURN BOOK PAGE
// 5) When the form is submitted successfully, the loan should be updated in the database
//    and the page should redirect to the loans listing page.

const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const op = sequelize.Op;
const moment = require('moment');
const Books = require('../models').Books;
const Loans = require('../models').Loans;
const Patrons = require('../models').Patrons;
let today = moment().format('YYYY-MM-DD');
let returnBy = moment().add(7, 'days').format('YYYY-MM-DD')

/* GET: All loans list */
router.get('/', (req, res, next) => {
  Loans
    .findAll({
      include:[
        {
          model: Books
        },
        {
          model: Patrons
        }      
    ],
      order:[['loaned_on',"DESC"]]
    })
    .then(loans => {
      res.render('loans/index', {
        title: 'All loans',
        page: req.baseUrl,
        loans: loans
      });
    })    
    .catch((err)=> {
      res.send(500);
    });
});

/* GET: Show view to create a new loan */
router.get('/new', (req, res, next)=> {
  Books
    .findAll()
    .then(books => {
    Patrons
      .findAll()
      .then(patrons => {
        res.render('loans/new', {
          title: 'New loans',
          page: req.baseUrl,
          books: books,
          patrons: patrons,
          today: today,
          returnBy: returnBy          
        });
      })
      .catch((err)=> {
        res.send(500);
      });
  });
});

/* POST: Create new loan */
router.post('/', (req, res, next) => {
  Loans
    .create(req.body)
    .then((loan) => {
      res.redirect('/loans');
    });
});

/* GET: Overdue loans */
router.get('/overdue', (req, res, next) => {
  Loans
    .findAll({
        include:[
          {
            model: Books
          },
          {
            model: Patrons
          }      
      ],
      where: {
        [op.and]: [{
          return_by: {
            [op.lt]: today
          },
          returned_on: {
            [op.eq]: null
          }
        }]
      }
    })
    .then(loans => {
      res.render('loans/overdue', {
        title: 'Overdue loans',
        page: req.baseUrl,
        loans: loans
      })
    })
    .catch((err)=> {
      res.send(500);
    });
});

/* GET: Checked_out loan */
router.get('/checked_out', (req, res, next) => {
  Loans
    .findAll({
        include:[
          {
            model: Books
          },
          {
            model: Patrons
          }      
      ],
      where: {
        loaned_on: {
          [op.ne]: null
        },
        returned_on: {
          [op.eq]: null
        }
      }
    })
    .then(loans => {
      res.render('loans/checked', {
        title: 'Checked out loans',
        page: req.baseUrl,
        loans: loans
      });
    })
    .catch((err)=> {
      res.send(500);
    });
});

/* GET: Return loan */
router.get('/return/:id', (req, res, next) => {
  Loans
    .findAll({
        include:[
          {
            model: Books
          },
          {
            model: Patrons
          }      
      ],
      where: {
        id: req.params.id
      }
    })
    .then(loans => {
      res.render('loans/return', {
        title: 'Patron: Return book',
        page: req.baseUrl,
        loans: loans,
        returned_on: today
      });
    })
    .catch((err)=> {
      res.send(500);
    });
});

/* POST: Update return loan */
router.post('/return/:id', (req, res, next) => {
  Loans
    .findById(req.params.id)
    .then(loans => {
      if (loans) {
        loans.returned_on = req.body.returned_on;
        return loans.update(req.body);
      } else {
        res.send(404);
      }
    })
    .then(() => {
      res.redirect('/loans')
    })
    .catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        Loans
        .findAll({
            include:[
              {
                model: Books
              },
              {
                model: Patrons
              }      
          ],
          where: {
            id: req.params.id
          }
        })
        .then(loans => {
          res.render('loans/return', {
            title: 'Patron: Return book',
            page: req.baseUrl,
            loans: loans,
            returned_on: today,
            errors: err.errors
          });
        })
      }
      else {
        throw err;
      }
    })
    .catch((err)=> {
      res.send(500);
    });
});

module.exports = router;
