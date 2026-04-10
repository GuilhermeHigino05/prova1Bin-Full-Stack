

class AuthMiddleware{


    async validar(req, res, next){
        let isLogged = false;

        // Verifica se a requisição veio com algum cookie no header
        if(req.headers.cookie){
            // Os cookies vêm como uma string única: "nome1=valor1; nome2=valor2"
            // Por isso usamos split para separar
            const cookies = req.headers.cookie;
            if(cookies.includes('usuarioLogado=')){
                isLogged = true;
            }
        }

        if(isLogged){
            next(); // Permite acessar a rota
        } else {
            res.redirect('/usuario/login'); // Interrompe e manda pro login
        }
    }
}

module.exports = AuthMiddleware;