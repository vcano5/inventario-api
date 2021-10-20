const router = require('express').Router();

const { addStocks, removeStocks, auditInventory, getIn, getOut, getById } = require('../controllers/inventario');

router.get('/', auditInventory);
router.get('/out', getOut);
router.get('/in', getIn);
router.put('/in', addStocks);
router.put('/out', removeStocks);
router.get('/:id', getById)

module.exports = router;