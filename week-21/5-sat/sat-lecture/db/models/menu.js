'use strict';
const {
  Model
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Menu.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // min: .01,
        // max: 100.00,
        // isDecimal: true,
        isGoodPrice(value){
          if(value <= 0){
            throw new Error("Price must be greater than 0");
          }
          if(value > 100){
            throw new Error("Price must be smaller than 100");
          }
        },
        addTax(value){
          this.price += value * 0.07;
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    amountSold: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
      validate: {
        isNumeric: true
      }
    }
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};
