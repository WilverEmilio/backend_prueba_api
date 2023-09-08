'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const moment = require('moment');
const axios = require('axios')

module.exports = {
    async find (req, res) {
        let id = req.body.id
        const options = {
            'method': 'GET',
            'url': 'http://localhost:5000/venta/find/id',
            'headers': {
              'Content-Type': 'application/json'
            },
            data: {
                id: id
            }
        };
        
        try {
            const result = await axios(options);
            console.log(result.data)
            if (result.data.id !== undefined) {
                const resultado = result.data
                const mensaje = "El venta con id " + resultado.id + " con fecha de creación " + resultado.fecha_venta + " tuvo un total de venta de:  " + resultado.total_venta;
                res.status(200).send(mensaje)
            }
            res.status(404).send("La venta no existe en el otro servicio")
        } catch (e) {
            console.log(e);
        } 
    },

    async create(req, res) {
        const { total, fecha_venta, cliente_id} = req.body;

        // Validar que se proporcionen los campos necesarios
        if (!total || !fecha_venta || !cliente_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Crear un objeto con los datos
        const datos_ingreso = {
            total, 
            fecha_venta, 
            cliente_id
        };

        // Envía la solicitud para crear el venta en el otro servicio
        const createOptions = {
            method: 'POST',
            url: 'http://localhost:5000/venta/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: datos_ingreso
        };

        try {
            const result = await axios(createOptions);
            console.log(result.data);
            // Aquí puedes manejar la respuesta del otro servicio como lo desees
            if(result.data !== undefined){
                const resultado = result.data
                const mensaje = "El venta con id " + resultado.id + " con fecha de venta fue " + resultado.fecha_venta + " ha sido creado"
                return res.status(201).send(mensaje)
            }
            res.status(500).json({ error: 'Error al insertar el venta en el otro servicio' });
        } catch (error) {
            console.log(error);
        }
    },

    async update(req, res) {
        const { id, total, fecha_venta, cliente_id } = req.body;

        // Validar que se proporcionen los campos necesarios
        if (!id || !total || !fecha_venta || !cliente_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Crear un objeto con los datos
        const datos_ingreso = {
            id, //el id siempre sera para que se pueda buscar si no aparece en este de datos ingreso no busca nada
            total, 
            fecha_venta, 
            cliente_id
        };

        const updateOptions = {
            method: 'PUT',
            url: 'http://localhost:5000/venta/update',
            headers: {
                'Content-Type': 'application/json'
            },
            data: datos_ingreso
        };

        try {
            const result = await axios(updateOptions);
            console.log(result.data);
            // Aquí puedes manejar la respuesta del otro servicio como lo desees
            if (result.data !== undefined) {
                const resultado = result.data
                const mensaje = "El venta con id " + resultado.id + " ha sido actualizado"
                return res.status(201).send(mensaje)
            }
            res.status(500).json({ error: 'Error al actualizar el venta en el otro servicio' });
        } catch (error) {
            console.log(error); 
        }
    },
    
    async delete(req, res) {
        const id = req.params.id;
    
        // Validar que se proporcione un ID válido
        if (!id) {
            return res.status(400).json({ error: 'Se requiere un ID válido' });
        }
    
        // Envía la solicitud para eliminar el venta en el otro servicio
        const deleteOptions = {
            method: 'DELETE',
            url: `http://localhost:5000/venta/delete/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        try {
            const result = await axios(deleteOptions);
            console.log(result.data);
            // Aquí puedes manejar la respuesta del otro servicio como lo desees
            if (result.data && result.data.message === 'Ventas eliminado correctamente') {
                return res.status(200).json({ message: 'Ventas eliminado correctamente' });
            }
            res.status(500).json({ error: 'Error al eliminar el venta en el otro servicio' });
        } catch (error) {
            console.error('Error al eliminar el venta:', error);
            return res.status(500).json({ error: 'Error al eliminar el venta' });
        }
    }
    
}