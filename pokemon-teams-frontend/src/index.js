const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

let trainers

fetch(TRAINERS_URL)
.then(function(response) {
  return response.json()
}).then(function(result) {
  trainers = result
  render()
})

const render = function() {
  trainers.forEach(function(trainer) {
    renderTrainer(trainer)
  })
}

const renderTrainer = function(trainer) {
  const trainerCard = main.appendChild(document.createElement('div'))
  trainerCard.className = 'card'
  trainerCard.dataset.id = trainer.id
  trainerCard.innerHTML = `<p>${trainer.name}</p>`

  renderAddButton(trainer, trainerCard)
  renderPokemonList(trainer, trainerCard)
}

const renderAddButton = function(trainer, trainerCard) {
  const addButton = trainerCard.appendChild(document.createElement('button'))
  addButton.dataset.trainerId = trainer.id
  addButton.innerText = 'Add Pokemon'
  addButton.addEventListener('click', function() {
    addPokemon(trainer)
  })
}

const renderPokemonList = function(trainer, trainerCard) {
  const pokemonList = trainerCard.appendChild(document.createElement('ul'))
  trainer.pokemons.forEach(function(pokemon) {
    renderListItem(trainer, pokemonList, pokemon)
  })
}

const renderListItem = function(trainer, pokemonList, pokemon) {
  const listItem = pokemonList.appendChild(document.createElement('li'))
  listItem.innerText = `${pokemon.nickname} (${pokemon.species}) `
  renderReleaseButton(trainer, pokemon, listItem)
}

const renderReleaseButton = function(trainer, pokemon, listItem) {
  const releaseButton = listItem.appendChild(document.createElement('button'))
  releaseButton.className = 'release'
  releaseButton.dataset.pokemonId = pokemon.id
  releaseButton.innerText = 'Release'
  releaseButton.addEventListener('click', function() {
    releasePokemon(trainer, pokemon)
  })
}

const addPokemon = function(trainer) {
  let newPokemon
  fetch((POKEMONS_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      trainer_id: trainer.id
    }
  }).then(function(response) {
    response.json()
  }).then(function(result) {
    newPokemon = result
  })
  console.log(newPokemon)
  trainer.pokemons.push(newPokemon)
  alert(`${trainer.name} added ${newPokemon.species}!`)
  render()
}

const releasePokemon = function(trainer, pokemon) {
  alert(`${trainer.name} released ${pokemon.species}!`)
}
