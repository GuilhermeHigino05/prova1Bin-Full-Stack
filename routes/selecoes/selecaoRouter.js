const express = require('express');
const SelecaoController = require('../../controller/selecoes/selecaoController');
const AuthMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

const ctrl = new SelecaoController

const auth = new AuthMiddleware;
router.get('/', auth.validar, ctrl.listar);
router.get('/cadastro',auth.validar, ctrl.cadastroView);
router.post('/cadastro',auth.validar, ctrl.cadastro);

module.exports = router;