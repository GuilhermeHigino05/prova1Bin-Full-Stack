const Database = require('../../utils/database')
const JogadorModel = require('../jogadores/jogadorModel')

class SelecaoModel {
    #id
    #nome
    #sigla

    get id() {return this.#id} set id(id){ this.#id = id }
    get nome() {return this.#nome} set nome(nome){ this.#nome = nome }
    get sigla() {return this.#sigla} set sigla(sigla){ this.#sigla = sigla }

    constructor(id, nome, sigla) {
        this.#id = id
        this.#nome = nome
        this.#sigla = sigla
    }

    async listar(){
        const sql = `select * from tb_selecao`
        let banco = new Database()
        const rows = await banco.ExecutaComando('sql');
        let selecoes = []
        if(rows.length > 0){
            rows.forEach((values) => {
                selecoes.push(new SelecaoModel(
                    values.sel_id,
                    values.sel_nome,
                    values.sel_sigla
                ))
            })
        }
        return selecoes;
    }
    
    async cadastro(){

    }
}

module.exports = SelecaoModel