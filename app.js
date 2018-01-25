const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0'
const pokedex = document.getElementById('pokedex')
const orderBtn = document.getElementById('order')

// Funciones
const connection = () => {
  for (let i = 1; i <= 9; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`

    fetch(url)
      .then(res => res.json())
      .then(res => create(res))
      .catch(err => console.warn(err))
  }
}

const create = pokemon => {
  let modelPokemon = `
  <article class="pokemon" data-id="${pokemon.id}">
    <figure class="pic">
      <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${pokemon.id}.png" alt="">
    </figure>
    <h2 class="name">${pokemon.name}</h2>
    <div>
      <p class="attr">${pokemon.types[0].type.name}</p>
    </div>
    <span class="id">Nº <span>${pokemon.id}</span></span>
  </article>
  `
  return pokedex.insertAdjacentHTML('beforeend', modelPokemon)
}

const order = () => {
  const ids = document.querySelectorAll('.pokemon')

  for (id of ids) {
    // obtengo el valor del atributo data-id y le asigno un orden mediante css
    id.style.order = id.dataset.id
  }
}

// evento ordenar
orderBtn.onclick = order

// petición a la api
connection()
