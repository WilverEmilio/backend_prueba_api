'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_impuestos extends Model {
   
  };
  tipo_impuestos.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_ventas: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bono_acumulado: {
        type: DataTypes.STRING,
        allowNull: false
      },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  }, {
    sequelize,
    modelName: 'fidelidad',
  });
  return tipo_impuestos;
};