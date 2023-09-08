'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_impuestos extends Model {
   
  };
  tipo_impuestos.init({
    total_ventas: {
        type: DataTypes.STRING,
        allowNull: false
      },
      iva: {
        type: DataTypes.STRING,
        allowNull: false
      },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'contabilidad',
  });
  return tipo_impuestos;
};