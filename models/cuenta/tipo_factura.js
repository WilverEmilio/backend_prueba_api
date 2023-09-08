'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_facturas extends Model {
    static associate(models) {
      tipo_facturas.hasMany(models.facturas, {
        foreignKey: "id_tipo_factura" //Hacer referencia a tabla hijo
      })
    }
  };
  tipo_facturas.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'tipo_facturas',
  });
  return tipo_facturas;
};