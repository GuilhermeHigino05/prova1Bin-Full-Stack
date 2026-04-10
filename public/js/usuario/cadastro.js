document.addEventListener('DOMContentLoaded', () => {
    let btn = document.getElementById('btn-cadastro');
    btn.addEventListener('click', (event) => gravar(event));

    function gravar(event){
        event.preventDefault();
        const nome = document.getElementById('nome');
        nome.style.borderColor = 'black';
        const email = document.getElementById('email');
        email.style.borderColor = 'black';
        const senha = document.getElementById('senha');
        senha.style.borderColor = 'black';
        const confirm_senha = document.getElementById('confirm-senha');
        confirm_senha.style.borderColor = 'black';

        let listavalid = [];

        if( nome.value == '' ) { listavalid.push( nome ) }
        if( email.value == '' ) { listavalid.push( email ) }
        if( senha.value == '' ) { listavalid.push( senha ) }
        if( confirm_senha.value == '' && confirm_senha.value != senha ) { listavalid.push( confirm_senha ) }

        if(listavalid.length == 0){
            fetch('/usuario/cadastro', {
                method: 'POST',
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: nome.value,
                    email: email.value,
                    senha: senha.value,
                    confirm_senha: confirm_senha.value
                })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.ok){
                    alert(data.msg);
                }else{
                    console.error(data.msg);
                    alert(data.msg);
                }
            })
        } else {
            listavalid.forEach((value) => {
                value.style.borderColor('red');
            })
            alert('Preencha todos os campos corretamente');
        }
    }
})