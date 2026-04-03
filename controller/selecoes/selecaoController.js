const SelecaoModel = require("../../model/selecoes/selecaoModel");


class SelecaoController{


    async listar(req,res){
        let sel = new SelecaoModel()
        let selecoes = await sel.listar();
        res.render('selecoes/selecoes', {selecoes});
    }

    cadastroView(req,res){
        res.render('selecoes/cadastroSelecoes');
    }
    
    async cadastro(req,res){
        let ok = false;
        let msg = '';
        try{
            if(req.body.nome != '' &&
            req.body.sigla != ''
            ){
                let sel = new SelecaoModel(0, req.body.nome, req.body.sigla);
                let result = await sel.cadastro();
                if(result){ 
                    ok = true;
                    msg = 'Selecao cadastrada com sucesso';
                }else{
                    msg = 'Erro ao cadastrar selecao'
                }
            } else{
                msg = 'Informações incorretas'
            }
            res.json({ok: ok, msg: msg})
        }catch(error){
            res.json(error)
        }
    }
}

module.exports = SelecaoController