const form = document.getElementById("novoItem");
const lista = document.getElementById("lista"); 
const itens = JSON.parse(localStorage.getItem("itens")) ||  [];

itens.forEach((element)=>{
    criaElemento(element)
})

// adicionando evento de envio
form.addEventListener("submit", (event) => {
    event.preventDefault();

   const tarefa  = event.target.elements['tarefa'];
   const horario = event.target.elements['horario'];

   const itemAtual = {
    "tarefa": tarefa.value,
    "horario": horario.value
    }   


    itemAtual.id = itens.length
    criaElemento(itemAtual) 
    itens.push(itemAtual)

  
    localStorage.setItem("itens", JSON.stringify(itens));

    // limpando inputs após submit
    tarefa.value  = "";
    horario.value = "";
})

// criando função que vai "clonar" a lista padrão do html e adicionar itens no localStorage
    function criaElemento(item){

    // clonando lista do html
    const novoItem = document.createElement('li');
    novoItem.classList.add("item")
    //adicionando id 
    novoItem.dataset.id = itens.id;


    const novaHora = document.createElement('strong');
    novaHora.innerHTML = item.horario;

    novoItem.appendChild(novaHora); 

    novoItem.innerHTML += item.tarefa;

    novoItem.appendChild(botaoDeleta(itens));

    lista.appendChild(novoItem);



}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText  = "x"
    elementoBotao.classList.add("botao-deleta")

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
        localStorage.removeItem(itens.id)

        
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()
    
    
}
    

