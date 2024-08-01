const modalBnt = document.querySelector(".modal-bnt");
const modal = document.querySelector(".modal-overlay");
const closeBnt = document.querySelector(".close-bnt");

// função privada ao objeto da classe onde irá adicionar uma nova classe via evento "click" 
modalBnt.addEventListener("click",function(){// <- para capitura o evento "click" da lista// ("click",function(){}); <- function dentro chama função privada
    modal.classList.add("open-modal");//<- para abrir
});
// função privada ao objeto da class onde irá remover uma classe via evento "click"
closeBnt.addEventListener("click",function(){
    modal.classList.remove("open-modal");//<- para fechar 
})