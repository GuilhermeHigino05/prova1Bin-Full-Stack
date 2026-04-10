const express = require('express');
const port = 5000;
const server = express();
const homeRouter = require('./routes/homeRoute');
const jogadorRouter = require('./routes/jogador/jogadorRoute');
const selecaoRouter = require('./routes/selecoes/selecaoRouter');
const cadastroRouter = require('./routes/usuario/usuarioRouter');
const AuthMiddleware = require('./middleware/authMiddleware');

const auth = new AuthMiddleware();
server.set('view engine', 'ejs');
//server.set("layout", "./layout.ejs")
server.use(express.static('public'))
//server.use(expressEjsLayout);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use('/', homeRouter)
server.use('/jogadores', auth.validar, jogadorRouter);
server.use('/selecoes', auth.validar, selecaoRouter);
server.use('/usuario', cadastroRouter)
server.listen(port, () => {
    console.log(`Server rodando http://localhost:${port}`);
})