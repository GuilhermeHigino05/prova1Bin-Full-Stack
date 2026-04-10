const express = require('express');
const router = express.Router();
const UsuarioController = require("../../controller/usuario/usuarioController");

const ctrl = new UsuarioController();

router.get('/cadastro', ctrl.cadastroView);
router.post('/cadastro', ctrl.cadastro);
router.get('/login', ctrl.loginView);
router.post('/login', ctrl.login);
router.get('/logout', ctrl.logout);

module.exports = router;