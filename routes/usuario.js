const router = require('express').Router();

// const {
// 	iniciarSesion,
// 	cancelarMembresia,
// 	registro,
// 	obtenerUsuario
// } = require('../controllers/usuario')

const {registro, getAccessToken, getUserInfo, isValidToken} = require('../controllers/usuario')

router.post('/registro', registro);
router.post('/login', getAccessToken);
router.get('/porUsuario:userId', getUserInfo);
router.get('/tokenValido', isValidToken);

// // const {
// // 	getLibro,
// // 	getLibros
// // } = require('../controllers/libro')

// const auth = require('./auth');
// const roles = require('./rol');

// router.post('/registro', registro);
// // router.post('/cancelarMembresia', auth.requerido, roles, cancelarMembresia)
// router.post('/entrar', iniciarSesion)
// router.get('/', auth.requerido, roles, obtenerUsuario);

module.exports = router;