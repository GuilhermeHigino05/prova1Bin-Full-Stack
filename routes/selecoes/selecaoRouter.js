const express = require('express');
const SelecaoController = require('../../controller/selecoes/selecaoController');
const router = express.Router();

const ctrl = new SelecaoController

router.get('/', ctrl.listar);
router.get('/cadastro', ctrl.cadastroView);
router.post('/cadastro', ctrl.cadastro);

module.exports = router;