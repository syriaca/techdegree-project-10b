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
    }
  }, {
      timestamps: false
  });

  Books.associate = function(models) {
    Books.hasMany(models.Loans, {foreignKey: 'book_id'});
  };
  
  return Books;
};