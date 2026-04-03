const express = require('express');
const port = 5000;
const server = express();
const homeRouter = require('./routes/homeRoute');
const jogadorRouter = require('./routes/jogador/jogadorRoute');
const selecaoRouter = require('./routes/selecoes/selecaoRouter')

server.set('view engine', 'ejs');
//server.set("layout", "./layout.ejs")
server.use(express.static('public'))
//server.use(expressEjsLayout);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use('/', homeRouter)
server.use('/jogadores', jogadorRouter);
server.use('/selecoes', selecaoRouter)

server.listen(port, () => {
    console.log(`Server rodando http://localhost:${port}`);
})