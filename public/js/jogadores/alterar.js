document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-alterar');

    btn.addEventListener('click', (event) => alterar(event));

    function alterar(event){
    
        event.preventDefault()
        const nome =  document.getElementById('nome');
        nome.style.borderColor = 'black';
        const numero =  document.getElementById('numero');
        numero.style.borderColor = 'black'
        const posicao =  document.getElementById('posicao');
        posicao.style.borderColor = 'black'
        const selecao =  document.getElementById('selecao');
        selecao.style.borderColor = 'black';

        listaValid = [];

        if(nome.value == '')
            listaValid.push(nome)
        if(numero.value == '')
            listaValid.push(numero)
        if(posicao.value == '')
            listaValid.push(posicao)
        if(selecao.value == '')
            listaValid.push(selecao);

        if(listaValid.length != 0){
            fetch('/jogadores/altera', {
                method: 'POST',
                headers: { 'Content-Type': 'applicatio/json' },
                body: JSON.stringify({
                    nome: nome.value,
                    numero: numero.value,
                    posicao: posicao.value,
                    selecao: selecao.value
                })
            }).then((response) => { return response.json(); })
            .then((data) => {
                if(data.ok){
                    alert(data.msg);
                }
                alert(data.msg);
            })
        }else{
            listaValid.forEach(element => {
                element.style.borderColor = 'red'
            });
            alert('Preencha todos os campos');
        }
    }
})