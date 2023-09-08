const { Router } = require('express');
const router = Router();

// facturas
const facturasController = require('../controllers/cuenta/facturaControler');
const externoController = require('../controllers/externo/TipoController');

//RUTAS

module.exports = (app) => {
    //facturas
    router.get('/factura/find', facturasController.find);
    router.post('/contabilidad/create', facturasController.create);

    router.get('/externo/find', externoController.find);
    router.post('/externo/create', externoController.create);
    router.put('/externo/update', externoController.update);
    router.delete('/externo/delete/:id', externoController.delete);

    app.use('/', router);

};