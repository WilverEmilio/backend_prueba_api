'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ventas extends Model {
    static associate(models) {
      
    }
  };
  ventas.init({
    total: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ventas',
  });
  return ventas;
};