'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Contabilidad = db.contabilidad;
const Fidelidad = db.fidelidad;
const moment = require('moment');
const axios = require('axios')

module.exports = {
    async find (req, res) {
        let ivaEnviar
        const options = {
            'method': 'GET',
            'url': 'http://localhost:3000/factura/find',
            'headers': {
              'Content-Type': 'application/json'
            },
            data: {
                iva: ivaEnviar
            }
          };
        
          try {
            const result = await axios(options);
            console.log(result.data);
            res.send(result.data + 'Utilizando la API de clientes')
          } catch (e) {
               console.log(e);
          }
     
    },

    async create(req, res){
      const operaciones = req.body.enviar_objeto
      var iva;
      var estado = 1;
      if (operaciones.id_tipo_impuestos == '1'){
        //Utilizar 5%
        iva = parseFloat(operaciones.total) * 0.05
      }
      else if (operaciones.id_tipo_impuestos == '2'){
        //Utilizar 12%
        iva = parseFloat(operaciones.total) * 0.12
      }
      const objetoContabilidad = {
        estado: estado,
        iva: iva,
        total_ventas: operaciones.total
      }

      try {
        await Contabilidad.create(objetoContabilidad)
      } catch (error) {
        console.log(error)
      }
      console.log('Todo esta bien')
    }
};

