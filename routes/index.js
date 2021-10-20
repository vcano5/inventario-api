var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to inventarios-api');
})

router.use('/articulo', require('./articulo'));

module.exports = router;