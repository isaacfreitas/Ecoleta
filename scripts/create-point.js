

function populateUFs() {
  const ufSelect = document
    .querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
      }

    })
}
populateUFs();


function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")


  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text


  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione a cidade</option>"//limpar
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled = false
    })

}


document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


//itens de coleta

//peggar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

//atualizar o input hidden dos items de coleta
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []; //criado como "let e não const pra ele oder ser alterado nas funções"

function handleSelectedItem(event) {
  itemLi = event.target;

  //add or remove uma classe com javascript
  //no caso para deixar o item selecionado em destaque e
  //enviar ao server
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id
  //console.log(itemLi.dataset.id)



  //verificar os itens selecionados,se sim 
  //peggar os itens selecionados

  const alredySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId //A function "FindIndex é boolean então aqui ele compara pra saber se ac"
    //found o tem or not e aloca em "itemfound"
    //se for true retorna a seleção =>
    return itemFound
  })

  console.log(alredySelected);

  //se ja estiver selecionado 
  if (alredySelected >= 0) {
    //tirar da seleção
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId //false
      return itemIsDifferent
    })

    selectedItems = filteredItems
  } else {
    //se n tiver selecionado adicionar à seleção
    selectedItems.push(itemId)

  }
  console.log(selectedItems)


  //atualizar o campo escondido com os dados selecionados

  collectedItems.value = selectedItems

}