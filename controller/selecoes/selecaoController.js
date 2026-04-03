const SelecaoModel = require("../../model/selecoes/selecaoModel");


class SelecaoController{


    async listar(req,res){
        let sel = new SelecaoModel()
        let selecoes = await sel.listar();
        res.render('/selecoes', {selecoes});
    }

    
}