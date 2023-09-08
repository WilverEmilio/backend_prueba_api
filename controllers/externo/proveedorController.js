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
            'url': 'http://localhost:5000/proveedores/find/id',
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
                const mensaje = "El proveedor con id " + resultado.id + " a nombre de " + resultado.nombre + " su numero de telefono es:  " + resultado.telefono
                res.status(200).send(mensaje)
            }
            res.status(404).send("El proveedor no existe en el otro servicio")
        } catch (e) {
            console.log(e);
        } 
    },

    async create(req, res) {
        const { nombre, telefono, direccion, correo } = req.body;

        // Validar que se proporcionen los campos necesarios
        if (!nombre || !telefono || !direccion || !correo) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Crear un objeto con los datos
        const datos_ingreso = {
            nombre, 
            telefono, 
            direccion, 
            correo,
        };

        // Envía la solicitud para crear el proveedores en el otro servicio
        const createOptions = {
            method: 'POST',
            url: 'http://localhost:5000/proveedores/create',
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
                const mensaje = "El proveedores con id " + resultado.id + " a nombre de " + resultado.nombre + " ha sido creado"
                return res.status(201).send(mensaje)
            }
            res.status(500).json({ error: 'Error al insertar el proveedores en el otro servicio' });
        } catch (error) {
            console.log(e);
        }
    },

    async update(req, res) {
        const { id, nombre, telefono, direccion, correo} = req.body;

        // Validar que se proporcionen los campos necesarios
        if (!nombre || !telefono || !direccion || !correo || !id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Crear un objeto con los datos
        const datos_ingreso = {
            id,
            nombre, 
            telefono, 
            direccion, 
            correo,
        };

        // Envía la solicitud para actualizar el proveedores en el otro servicio
        const updateOptions = {
            method: 'PUT',
            url: 'http://localhost:5000/proveedores/update',
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
                const mensaje = "El proveedor con id " + resultado.id + " a nombre de " + resultado.nombre + " ha sido actualizado"
                return res.status(201).send(mensaje)
            }
            res.status(500).json({ error: 'Error al actualizar el proveedores en el otro servicio' });
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
    
        // Envía la solicitud para eliminar el proveedores en el otro servicio
        const deleteOptions = {
            method: 'DELETE',
            url: `http://localhost:5000/proveedores/delete/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        try {
            const result = await axios(deleteOptions);
            console.log(result.data);
            // Aquí puedes manejar la respuesta del otro servicio como lo desees
            if (result.data && result.data.message === 'Proveedor eliminado correctamente') {
                return res.status(200).json({ message: 'Proveedor eliminado correctamente' });
            }
            res.status(500).json({ error: 'Error al eliminar el proveedores en el otro servicio' });
        } catch (error) {
            console.error('Error al eliminar el proveedores:', error);
            return res.status(500).json({ error: 'Error al eliminar el proveedores' });
        }
    }
    
}