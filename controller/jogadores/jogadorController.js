const JogadorModel = require("../model/jogadorModel");


class jogadorController{
    

    async listar(req,res){
        let lista = new JogadorModel()
        let jogador = await lista.listar();
        res.render('jogadores/jogadores', { jogadores: jogador })
    }

    async cadastroView(req,res){
        let lista = new JogadorModel()
        let posicao = await lista.listarPosicoes();
        res.render('jogadores/cadastroJogadores', { posicoes: posicao })
    }

    async cadastro(req, res){
        let ok = false
        let msg = ''
        if(req.body.nome != '' && 
            req.body.numero != '' &&
            req.body.posicao != '' &&
            req.body.selecao != '' 
        ){
            let jogador = new JogadorModel(0,
                req.body.nome,
                req.body.numero, 
                req.body.posicao, 
                req.body.selecao 
            )
            let result = await jogador.cadastrar()
            try{
                if(result != 'ErrSel'){
                    if(result != 'ErrPos'){
                        if(result != 'ErrNum'){
                            ok = true;
                            msg = 'Jogador cadastrado com sucesso'
                        }else{
                            msg = 'Numero já existente'
                        }
                    }else{
                        msg = 'Posição não cadastrada'
                    }
                }else{
                    msg = 'Selecao nao cadastrada'
                }
                            
            }catch(error){
                console.log(error);
                res.status(500).json({ok: false, msg: 'Erro interno no servidor'})
            }
        }
        else{
            ok = false
            msg = 'Digite corretamente as informações';
        }
        res.json({ ok, msg })
    }
    
}

module.exports = jogadorController