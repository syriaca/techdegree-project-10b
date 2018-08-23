'use strict';

var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Loans = sequelize.define('Loans', {
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_on: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'The date field must be filled'
        },
        isDate: {
          msg: 'Must be a valide date'
        }
      }
    }
  }, {
    timestamps: false
  });

  Loans.associate = function(models) {
    Loans.belongsTo(models.Books, {targetKey:'id', foreignKey: 'book_id' });
    Loans.belongsTo(models.Patrons, {targetKey:'id', foreignKey: 'patron_id' });
  };

  Loans.prototype.formatedDate = function(date) {
    return moment(date).format('YYYY-MM-DD');
  };
  
  return Loans;
};