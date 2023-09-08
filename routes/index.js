const { Router } = require('express');
const router = Router();

// facturas
const facturasController = require('../controllers/cuenta/facturaControler');
const externoController = require('../controllers/externo/TipoController');
const clienteController = require('../controllers/externo/clienteController');
const ventaController = require('../controllers/externo/ventasController');
const proveedoresCOntroller = require('../controllers/externo/proveedorController')

//RUTAS

module.exports = (app) => {
    //facturas
    router.get('/factura/find', facturasController.find);
    router.post('/contabilidad/create', facturasController.create);

    router.get('/externo/find', externoController.find);
    router.post('/externo/create', externoController.create);
    router.put('/externo/update', externoController.update);
    router.delete('/externo/delete/:id', externoController.delete);

    router.get('/cliente/find', clienteController.find);
    router.post('/cliente/create', clienteController.create);
    router.put('/cliente/update', clienteController.update);
    // router.delete('/cliente/delete/:id', clienteController.delete);

    router.get('/venta/find', ventaController.find);
    router.post('/venta/create', ventaController.create);
    router.put('/venta/update', ventaController.update);
    router.delete('/venta/delete/:id', ventaController.delete);

    router.get('/proveedores/find', proveedoresCOntroller.find);
    router.post('/proveedores/create', proveedoresCOntroller.create);
    router.put('/proveedores/update', proveedoresCOntroller.update);
    router.delete('/proveedores/delete/:id', proveedoresCOntroller.delete);
    

    app.use('/', router);

};