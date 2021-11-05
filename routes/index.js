var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to inventarios-api');
})

// router.use('/articulo', require('./articulo'));
router.use('/inventario', require('./inventario'));
router.use('/cliente', require('./cliente'))
router.use('/ordenes', require('./ordenes'))
router.use('/usuarios', require('./usuario'))
router.use('/productos', require('./productos'))
router.use('/proveedores', require('./proveedores'))

module.exports = router;