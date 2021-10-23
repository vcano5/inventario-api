const router = require('express').Router();

const {crearOrden, getOrders, getOrderById} = require('../controllers/ordenes')

router.get('/', getOrders);
router.get('/:orderId', getOrderById)

module.exports = router;