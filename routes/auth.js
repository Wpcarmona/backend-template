const { Router} = require('express');
const { check } = require('express-validator');
const { login, generateNewToken,logout } = require('../controllers/auth.controller');
const { validateCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/auth');

const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validateCampos
], login);

router.get('/genNewToken',generateNewToken)

router.post('/logout', validarJWT, logout);





module.exports = router;