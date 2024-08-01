function abrirModal(){
    const modal = document.getElementById('janela-modal')
    modal.classList.add('abrir')

    modal.addEventListener('click',(e) =>{
        if(e.target.id == 'fechar' || e.target.id == 'janela-modal'){
            modal.classList.remove('abrir')
        }
    })
}

function abrirlogin(){
    const modal = document.getElementById('janela-login')
    modal.classList.add('abrir')

    modal.addEventListener('click',(e) =>{
        if(e.target.id == 'fechar' || e.target.id == 'janela-login'){
            modal.classList.remove('abrir')
        }
    })
}