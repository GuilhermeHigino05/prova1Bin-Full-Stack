document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelectorAll('.btn-excluir');
    
    for(let i = 0; i< btn.length; i++){
        btn[i].addEventListener('click', excluir);
    }

    function excluir(){
        let id = this.dataset.id;

        if(confirm('Deseja realmente excluir esse Usuario?')){
            fetch('/jogadores/excluir', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.ok){
                    alert(data.msg);
                    window.location.reload();
                } else{
                    alert(data.msg);
                }
            })
        }
    }
})