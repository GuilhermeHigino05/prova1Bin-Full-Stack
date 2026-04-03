const express = require('express');
const jogadorController = require('../../controller/jogadores/jogadorController');


const router = express.Router();
const ctrl = new jogadorController;

router.get('/', ctrl.listar);
router.get('/cadastro',ctrl.cadastroView);
router.post('/cadastro', ctrl.cadastro);
module.exports = router