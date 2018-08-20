'use strict';

module.exports = (sequelize, DataTypes) => {
  var Patrons = sequelize.define('Patrons', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'The firstname field is required'
        }
      }              
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'The lastname field is required'
        }
      }              
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'The address field is required'
        }
      }              
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'The email field is required'
        }
      }              
    },
    library_id: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'The library ID field is required'
        }
      }              
    },
    zip_code: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Zip code field is required'
        },
        isNumeric: {
          msg: 'Zip code field must be numeric'
        },
        len: {
          args: [4, 10], 
          msg: 'Zip code must contain between 4 and 10 numbers'
        },
        isInt: {
          msg: 'Zip code must be a number'
        }
      }
    }
  }, {
    timestamps: false
  });
  Patrons.associate = function(models) {
    Patrons.hasMany(models.Loans, {foreignKey: 'patron_id'});
  };
  return Patrons;
};