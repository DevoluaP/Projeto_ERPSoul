/*
 *Programa: menu responsivo + modal;
 *Autor: Karen Rodrigues;
 *Licença: GNU;
 *Data: 11/04/2024;
 *Versão: 1.0;
*/
//modal

//const modalBtn = document.querySelector(".modal-btn");
//const modalBtn = document.getElementsByClassName("modal-btn")[0];
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

/*
modalBtn.addEventListener("click",function(){
    document.getElementById("modal-container").innerHTML = document.getElementById(this.dataset.conteudo).innerHTML;

    modal.classList.add("open-modal");
});
*/



function abreModal(obj){
    var idContent = obj.dataset.conteudo;
    var urlContent = obj.dataset.url;
    console.log(urlContent);


    //Sobrescrevendo o HTML da div modal-container ---------------- NA MESMA PÁGINA
    //document.getElementById("modal-container").innerHTML = document.getElementById(idConteudoQueVaiParaOModal).innerHTML;

    //Pegando o HTML de uma págin externa
    $("#modal-container").load(urlContent);

    modal.classList.add("open-modal");
}

/*
closeBtn.addEventListener("click", function(){
    modal.classList.remove("open-modal");
});
*/
function fecharModal(){
    modal.classList.remove("open-modal");
}