const router = require('express').Router();

const {crearProducto, buscarPorMarca, todosLosProductos, buscarPorId} = require('../controllers/productos')

const roles = require('./rol');
const auth = require('./auth');
const { application } = require('express');


router.get('/', auth.requerido, todosLosProductos)
router.post('/', auth.requerido, crearProducto);
router.get('/producto/:productId', buscarPorId);
// router.put('/:ID', auth.requerido, roles, updateItem)


module.exports = router;