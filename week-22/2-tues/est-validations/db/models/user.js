'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  // ""
  User.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,30],
        isAlpha: true
      }
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,30],
        isAlpha: true
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        isStrongPassword(value){
          // value -> password   -> needs to include: capital, !, 6 letters,
          const stringArr = value.split('');
          if(!stringArr.includes('!')){
            throw new Error("Password must have an exclamation mark");
          }
          if(stringArr.length < 6){
            throw new Error("Password must be longer than 6 characters");
          }
          if(stringArr[0] !== stringArr[0].toUpperCase()){
            throw new Error("password must start with a capital letter");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
