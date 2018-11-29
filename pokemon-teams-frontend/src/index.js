const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')
document.addEventListener('DOMContentLoaded', () => {
  fetchTrainers().then(r => r.forEach(renderTrainer))
})

function fetchTrainers() {
  return fetch(TRAINERS_URL).then(r => r.json())
}

function renderTrainer(trainer)  {
  let trainerCard = document.createElement('div')
  trainerCard.dataset.id = trainer.id 
  trainerCard.id = `trainer-${trainer.id}`
  trainerCard.className = 'card'

  trainerCard.innerHTML = `
  <p>${trainer.name}</p>
  <button data-trainer-id="${trainer.id}">Add Pokemon</button>
  <ul></ul>
  `
  trainerCard.querySelector('button').addEventListener('click', addPoke)

  const pokeList = trainerCard.querySelector('ul')
  trainer.pokemons.forEach( poke => pokeList.append(makePoke(poke)))

  main.append(trainerCard)
}

function makePoke(pokemon) {
  const pokeLi = document.createElement('li')

  pokeLi.innerHTML = `
  ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
  `
  pokeLi.querySelector('.release').addEventListener('click', releasePoke)
  return pokeLi
}

function addPoke(e) {
  // let newPoke;

  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({trainer_id: `${e.target.dataset.trainerId}`})
  }).then(r => r.json())
  .then(r => {
    if (r.error) {
      alert(r.error)
    } else {
      document.querySelector(`#trainer-${r.trainer_id} ul`).append(makePoke(r))
    }
  })
}

function releasePoke(e) {

  fetch(POKEMONS_URL + `/${e.target.dataset.pokemonId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json'
    },
  })
  e.target.parentNode.remove()
}


