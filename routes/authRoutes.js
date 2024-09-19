const { Router} = require('express');
const { check } = require('express-validator');
const { login, generateNewToken,logout } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validaFieldsMiddleware');
const { validarJWT } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validateFields
], login);

router.get('/genNewToken',generateNewToken)

router.post('/logout', validarJWT, logout);





module.exports = router;