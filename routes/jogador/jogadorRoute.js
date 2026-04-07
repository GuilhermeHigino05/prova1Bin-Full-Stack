const express = require('express');
const jogadorController = require('../../controller/jogadores/jogadorController');


const router = express.Router();
const ctrl = new jogadorController;

router.get('/', ctrl.listar);
router.get('/cadastro',ctrl.cadastroView);
router.post('/cadastro', ctrl.cadastro);
router.post('/excluir', ctrl.deletar);
router.post('/alterar', ctrl.alterar);
router.get('/alterar/:id', ctrl.alterarView);
module.exports = router