const router = require('express').Router();

const { addStocks, removeStocks, auditInventory, getIn, getOut, getById, auditInventoryByDate, getQuantity } = require('../controllers/inventario');

const auth = require('./auth');

router.get('/', auth.requerido ,auditInventory);
router.get('/out', auth.requerido, getOut);
router.get('/in', auth.requerido, getIn);
router.post('/in', auth.requerido, addStocks);
router.post('/out', auth.requerido, removeStocks);
router.get('/id/:id', auth.requerido, getById)
router.get('/DESC/', auth.requerido, auditInventoryByDate)
router.get('/quantity', getQuantity)

module.exports = router;