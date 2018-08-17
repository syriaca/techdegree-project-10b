'use strict';
var dateFormat = require('dateformat');

module.exports = (sequelize, DataTypes) => {
  var Loans = sequelize.define('Loans', {
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_on: DataTypes.DATE
  }, {
    timestamps: false
  });

  Loans.associate = function(models) {
    Loans.belongsTo(models.Books, { foreignKey: 'book_id' });
    Loans.belongsTo(models.Patrons, { foreignKey: 'patron_id' });
  };

  Loans.prototype.formatedDate = function (date) {
    return dateFormat(date, "isoDate");
  };

  return Loans;
};