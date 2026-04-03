

document.addEventListener('DOMContentLoaded', () => {
    let btn = document.getElementById('btn-Cadastro');
    btn.addEventListener('click', (event) => gravar(event) )

    function gravar(event){
        event.preventDefault();
        const nome = document.getElementById('nome');
        nome.style.borderColor = "black";
        const sigla = document.getElementById('sigla');
        sigla.style.borderColor = "black";

        let listaValid = [];

        if(nome.value == '')
            listaValid.push(nome);
        if(sigla.value == '')
            listaValid.push(sigla);
        
        if(listaValid.length == 0){
            fetch('/selecoes/cadastro', {
                method: 'POST',
                headers: 'Content-Type' = 'application/json',
                body: JSON.stringify({
                    nome: nome.value,
                    sigla: nome.value
                })
            }).then((response) => {
                return response.json()
            }).then((data) => {
                if(data.ok){
                    console.log(data.msg)
                    alert(msg)
                } else{
                    console.error(data.msg)
                    alert(data.msg);
                }
            })
        } else{
            listaValid.forEach((values) => {
                values.style.borderColor = 'red'
            })
            alert('Preencha todos os campos corretamente'); 
        }
    }
})