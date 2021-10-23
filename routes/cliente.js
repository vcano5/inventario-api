const router = require('express').Router();

const { crearCliente, crearOrden, findOrderByClientId, findOrderByOrderId, findAll} = require('../controllers/clientes');

router.get('/', findAll);

module.exports = router;