'use strict';
module.exports = (sequelize, DataTypes) => {
  var Books = sequelize.define('Books', {
    title: {
     type: DataTypes.STRING,
     validate: {
        notEmpty: {
          msg: 'The title field is required'
        }
     }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'The author field is required'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'The genre field is required'
        }
      }
    },
    first_published: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'First published field is required'
        },
        isNumeric: {
          msg: 'First published field must be numeric'
        },
        len: {
          args: 4,
          msg: 'Year date must be 4 numeric date'
        },
        isInt: {
          msg: 'First published field must be an integer'
        }
      }
    }
  }, {
      timestamps: false
  });
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};