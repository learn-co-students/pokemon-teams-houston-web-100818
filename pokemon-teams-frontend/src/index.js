const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')
let selectedTrainer;
let selectedPokemon;

console.log(main)

const render = function () {
    fetch(TRAINERS_URL)
    .then(function(response){
        return response.json()
    })
    .then(function(trainers){
        // console.log(trainers)
        renderTrainerCards(trainers)
    })
}

const renderTrainerCards = function(trainers) {
    main.innerHTML = ''
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


        addPokemonButton.addEventListener('click', function(){
            selectedTrainer = trainer
            console.log(selectedTrainer.pokemons)
            if (selectedTrainer.pokemons.length < 7){
                createPokemon()
            }

        })
        
        main.append(trainerDiv)
        trainerDiv.append(trainerName, addPokemonButton)
        trainer.pokemons.forEach(function (pokemon){
            const pokemonListItems = document.createElement('li')
            const releaseButton = document.createElement('button')
            // console.log(pokemon.nickname)

            pokemonListItems.innerHTML = `${pokemon.nickname} (${pokemon.species})`
            
            releaseButton.innerHTML = 'Release'
            releaseButton.className = 'release'
            releaseButton.dataset.pokemonId = pokemon.id
            releaseButton.addEventListener('click', function(){
                selectedPokemon = pokemon
                // selectedTrainer = trainer
                releasePokemon()
            })


            trainerDiv.append(pokemonList)
            pokemonList.append(pokemonListItems)
            pokemonListItems.append(releaseButton)
        })
    })

}

const createPokemon = function() {
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: selectedTrainer.id
        })
    }).then(render)
    
}

const releasePokemon = function(){
    fetch(`http://localhost:3000/pokemons/${selectedPokemon.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then(render)
    
}

render()