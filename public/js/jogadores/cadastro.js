document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-cadastro');
    btn.addEventListener('click', (event) => gravar(event));

    function gravar(event){
        event.preventDefault()
        const nome =  document.getElementById('nome');
        nome.style.borderColor = 'Black';
        const numero = document.getElementById('numero');
        numero.style.borderColor = 'Black'
        const posicao = document.getElementById('posicao');
        posicao.style.borderColor = 'Black';
        const selecao = document.getElementById('selecao');
        selecao.style.borderColor = 'Black';

        let listaValid = []

        if(nome.value == '')
            listaValid.push(nome)
        if(numero.value == '')
            listaValid.push(numero)
        if(posicao.value == '')
            listaValid.push(posicao)
        if(selecao.value == '')
            listaValid.push(selecao)

        if(listaValid.length == 0 ){
            fetch('/jogadores/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    nome: nome.value,
                    numero: numero.value,
                    posicao: posicao.value,
                    selecao: selecao.value
                })
            }).then((response) => {
                return response.json()
            }).then((data) => {
                if(data.ok){
                    console.log(data.msg)
                    alert(data.msg)
                }else{
                    console.log(data.msg)
                    alert(data.msg)
                }
            })
        } else{
            listaValid.forEach((value) => {
                value.style.borderColor = 'Red';
            })
            alert('Preencha todos os campos')
        }
    }
})