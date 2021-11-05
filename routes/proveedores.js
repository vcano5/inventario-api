const router = require('express').Router();

const {registarProveedor, consultarProveedorPorId, consultarProveedorPorEmail, consultarProveedores} = require('../controllers/proveedores')
const auth = require('./auth')


router.get('/', consultarProveedores);
router.get('/id/:supplierId', consultarProveedorPorId);
router.post('/', auth.requerido, registarProveedor)

module.exports = router;