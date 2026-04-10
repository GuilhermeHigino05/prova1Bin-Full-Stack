const UsuarioModel = require("../../model/usuario/usuarioModel");


class UsuarioController{

    cadastroView(req,res){
        res.render('usuario/cadastro');
    }

    loginView(req,res){
        res.render('usuario/login');
    }

    async login(req,res){
        let ok = false
        let msg = '';
        const {email,senha} = req.body;
        if(email != '' && senha != ''){
            const usuario = new UsuarioModel();
            let result = await usuario.validaUsuario(email,senha);
            if(result){
                // O Express permite criar o cookie usando res.cookie direto
                res.cookie("usuarioLogado", result.usu_id);
                ok = true;
                msg = 'Usuario logado com sucesso'
            }else{
                msg = 'Erro ao logar usuario'
            }
        }else{
            msg = 'Informações incorretas'
        }
        res.json({ok, msg});
    }

    logout(req, res){
        res.clearCookie("usuarioLogado"); // Remove o cookie do navegador
        res.redirect('/usuario/login');   // Redireciona de volta p/ login
    }

    async cadastro(req,res){
        let ok = false;
        let msg = '';
        const values = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            confirm_senha: req.body.confirm_senha
        }

        if(values.nome != '' &&
            values.email != '' &&
            values.senha != '' &&
            values.confirm_senha === values.senha
        ){
            const usuario = new UsuarioModel(0, values.nome, values.email, values.senha);
            let result = await usuario.cadastro();
            if(result === 'ErrEmail'){
                msg = 'Email invalido'
            }
            else if(result){
                ok = true;
                msg = 'Usuario cadastrado com sucesso'
            }
            else{
                msg = 'Erro ao cadastrar usuario';
            }
        }else{
            msg = 'Informações incorretas'
        }
        res.json({ok, msg});
    }

}

module.exports = UsuarioController;