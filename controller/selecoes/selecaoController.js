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
        if(req.body.nome != '' &&
            req.body.sigla != ''
            ){
            try{
                    let sel = new SelecaoModel(0, req.body.nome, req.body.sigla);
                    let result = await sel.cadastro();
                    if(result){ 
                        ok = true;
                        msg = 'Selecao cadastrada com sucesso';
                    }else{
                        msg = 'Erro ao cadastrar selecao'
                    }
                }catch(error){
                    console.log(error);
                    res.status(500).json({ok: false, msg: 'Erro interno no servidor'})
                }
            }else{
                msg = 'Informações incorretas'
            }
        res.json({ok, msg})
    }
}

module.exports = SelecaoController