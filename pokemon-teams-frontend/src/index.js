const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

console.log(main)

const render = function () {
    fetch('http://localhost:3000/trainers')
    .then(function(response){
        return response.json()
    })
    .then(function(trainers){
        console.log(trainers)
        renderTrainers(trainers)
    })
}

const renderTrainers = function(trainers) {
    trainers.forEach(function(trainer){
        const trainerDiv = document.createElement('div')
        const trainerName = document.createElement('p')
        const addPokemonButton = document.createElement('button')
        const pokemonList = document.createElement('ul')
       
        trainerDiv.className = 'card'
        trainerDiv.dataset.id = trainer.id
        trainerName.innerHTML = trainer.name
        addPokemonButton.dataset.trainerId = trainer.id
        addPokemonButton.innerText = 'Add Pokemon'
        
        
        
        
        
        main.append(trainerDiv)
        trainerDiv.append(trainerName, addPokemonButton)
        trainer.pokemons.forEach(function (pokemon){
            const pokemonListItems = document.createElement('li')
            const releaseButton = document.createElement('button')
            console.log(pokemon.nickname)

            pokemonListItems.innerHTML = `${pokemon.nickname} (${pokemon.species})`
            releaseButton.innerHTML = 'Release'
            releaseButton.className = 'release'
            releaseButton.dataset.pokemonId = pokemon.id

            trainerDiv.append(pokemonList)
            pokemonList.append(pokemonListItems)
            pokemonListItems.append(releaseButton)
        })
    })

}

render()