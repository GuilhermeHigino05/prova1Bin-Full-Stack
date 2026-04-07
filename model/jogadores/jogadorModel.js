const Database = require("../../utils/database")


class JogadorModel {
    #id
    #nome
    #numero
    #posicao
    #selecao

    get id() { return this.#id; } set id(id) { this.#id = id; }
    get nome() { return this.#nome; } set nome(nome) { this.#nome = nome; }
    get numero() { return this.#numero; } set numero(numero) { this.#numero = numero; }
    get posicao() { return this.#posicao; } set posicao(posicao) { this.#posicao = posicao; }
    get selecao() { return this.#selecao; } set selecao(selecao) { this.#selecao = selecao; }

    constructor(id, nome, numero, posicao, selecao) {
        this.#id = id;
        this.#nome = nome;
        this.#numero = numero;
        this.#posicao = posicao;
        this.#selecao = selecao;

    }

    async listar(){
        let sql  = `select j.jog_id, j.jog_nome, j.jog_numero, p.pos_nome, s.sel_nome
                    from tb_jogador j
                    inner join tb_selecao s on s.sel_id = j.sel_id
                    inner join tb_posicao p on p.pos_id = j.pos_id
                    order by j.jog_id`;
        let banco =  new Database()
        let rows = await banco.ExecutaComando(sql);
        let jogadores = [];
        if(rows.length > 0){
            rows.forEach((values) => {
                jogadores.push(new JogadorModel(
                    values.jog_id,
                    values.jog_nome, 
                    values.jog_numero, 
                    values.pos_nome, 
                    values.sel_nome));
            });
        }
        return jogadores;
    }

    async listarPosicoes(){
        let sql = `select pos_nome from tb_posicao`
        let banco = new Database();
        let rows = await banco.ExecutaComando(sql);
        let posicoes = [];
        rows.forEach((values) => {
            posicoes.push(values);
        })
        return posicoes;
    }

    async obterIdSel(nome){
        let sql = `select sel_id
                    from tb_selecao
                    where sel_nome = ?`
        let selNome = nome;
        let banco = new Database()
        let rows = await banco.ExecutaComando(sql,selNome);
        return rows.length > 0 ? rows[0].sel_id : null
    }

    async obterNum(num){
        let sql = `select j.jog_numero
                    from tb_jogador j 
                    inner join tb_selecao s on j.sel_id = s.sel_id
                    where j.jog_numero = ? and s.sel_nome = ?`
        let values = [num, this.#selecao]
        let banco = new Database()
        let rows = await banco.ExecutaComando(sql, values)
        return rows.length > 0 ? true : false;
    }

    async obterIdPos(nome){
        let sql = `select pos_id
                    from tb_posicao
                    where pos_nome = ?`
        let posNome = nome;
        let banco = new Database()
        let rows = await banco.ExecutaComando(sql,posNome);
        return rows.length > 0 ? rows[0].pos_id : null
    }
    async cadastrar(){
        let sql = `insert into tb_jogador (jog_id,jog_nome, jog_numero, pos_id, sel_id) 
            values (?,?,?,?,?)`;
        let selId = await this.obterIdSel(this.#selecao);
        let posId = await this.obterIdPos(this.#posicao);
        let banco = new Database()
        let num = this.obterNum(this.#numero);
        if(selId){
            if(posId){
                if(num){
                    let values = [this.#id, this.#nome, this.#numero, posId, selId,];
                    let result = await banco.ExecutaComandoNonQuery(sql,values);
                    return result;
                }else{
                    return 'ErrNum'
                }
            }else{
                return 'ErrPos'
            }
        }else{
            return 'ErrSel'
        }
    }

    async excluir(id){
        let sql = `delete from tb_jogador where jog_id = ?`
        let values = [id];
        let banco = new Database();
        let result = await banco.ExecutaComandoNonQuery(sql, values);
        return result;
    }

    async obter(id){
        let sql  = `select j.jog_id, j.jog_nome, j.jog_numero, p.pos_nome, s.sel_nome
                    from tb_jogador j
                    inner join tb_selecao s on s.sel_id = j.sel_id
                    inner join tb_posicao p on p.pos_id = j.pos_id
                    where j.jog_id = ?
                    order by j.jog_id`;
        let banco =  new Database()
        const jogid = id
        let rows = await banco.ExecutaComando(sql,jogid);
        let jogadores = [];
        if(rows.length > 0){
            rows.forEach((values) => {
                jogadores.push(new JogadorModel(
                    values.jog_id,
                    values.jog_nome, 
                    values.jog_numero, 
                    values.pos_nome, 
                    values.sel_nome));
            });
        }
        return jogadores;
    }

    async alterar(){
        let sql = `update tb_jogador set jog_nome = ?, jog_numero = ?, pos_id = ?, sel_id = ?`;
        let selId = await this.obterIdSel(this.#selecao);
        let posId = await this.obterIdPos(this.#posicao);
        let banco = new Database()
        let num = this.obterNum(this.#numero);
        if(selId){
            if(posId){
                if(num){
                    let values = [ this.#nome, this.#numero, posId, selId,];
                    let result = await banco.ExecutaComandoNonQuery(sql,values);
                    return result;
                }else{
                    return 'ErrNum'
                }
            }else{
                return 'ErrPos'
            }
        }else{
            return 'ErrSel'
        }
    }
}

module.exports = JogadorModel;