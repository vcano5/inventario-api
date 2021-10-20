const router = require('express').Router();

const {updateItem} = require('../controllers/articulos')

const roles = require('./rol');
const auth = require('./auth');



router.put('/:ID', auth.requerido, roles, updateItem)


module.exports = router;