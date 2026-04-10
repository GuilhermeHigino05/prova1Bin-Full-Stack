const Database = require('../../utils/database')

class UsuarioModel {
    #id
    #nome
    #email
    #senha
    get id() { return this.#id } set id(value) { this.#id = value }
    get nome() { return this.#nome }  set nome(value) { this.#nome = value }
    get email() { return this.#email } set email(value) { this.#email = value }
    get senha() { return this.#senha } set senha(value) { this.#senha = value }

    constructor(id, nome, email, senha){
        this.id = id
        this.nome = nome
        this.email = email
        this.senha = senha
    }

    async listar(){
        const sql = `select * from tb_usuario`;
        let banco = new Database();
        let rows = await banco.ExecutaComando(sql);
        let usuarios = [];
        if(rows.length > 0){
            rows.forEach((element) => {
                usuarios.push(new UsuarioModel(
                    element.usu_id,
                    element.usu_nome,
                    element.usu_email,
                    element.usu_senha
                ))
            });
        }
        return usuarios;
    }

    async verificaEmail(){
        const sql = `select * from tb_usuario where usu_email = ?`;
        let banco = new Database();
        let rows = await banco.ExecutaComando(sql, [this.email]);
        if(rows.length > 0){
            return false;
        } else {
            return true;
        }
    }

    async cadastro(){
        const sql = `insert into tb_usuario (usu_id,usu_nome, usu_email, usu_senha)
        values (?,?,?,?)`;
        
        let verifica = await this.verificaEmail();
        if(verifica){
            let values = [this.#id, this.#nome, this.#email, this.#senha]
            let banco = new Database();
            let result = await banco.ExecutaComandoNonQuery(sql, values); 
            return result;
        }else{
            return 'ErrEmail';
        }
        
    }


    async validaUsuario(email, senha){
        const sql = `select * from tb_usuario 
                    where usu_email = ? and usu_senha = ?`
        const values = [email, senha];
        const banco = new Database()
        let rows = await banco.ExecutaComando(sql, values);
        
        if (rows.length > 0) {
            return rows[0]; // Retorna os dados do usuario (como usu_id)
        } else {
            return null; // Retorna nulo se não encontrar
        }
    }
}

module.exports = UsuarioModel