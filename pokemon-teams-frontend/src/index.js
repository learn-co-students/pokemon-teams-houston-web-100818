const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pokePage = document.querySelector('main')

let dataArray;

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then((resp)=>resp.json())
    .then((data)=>{
        dataArray = data
        render()
    })
}
function render() {
    pokePage.innerHTML = ''
    dataArray.forEach((trainer)=>{
        const pokeCard = document.createElement('div')
        pokeCard.setAttribute('class','card')
        pokeCard.dataset.id = 1
        
        const trainerName = document.createElement('p')
        trainerName.innerText = trainer.name
        
        const pokeButton = document.createElement('button')
        pokeButton.dataset.trainerId = trainer.id
        pokeButton.innerText = 'Add Pokemon'
        pokeButton.addEventListener('click', ()=>{
            
                addPokemon(trainer.id)
            })
            
        const pokeList = document.createElement('ul')
        trainer.pokemons.forEach((pokemon)=>{
            pokeList.append(renderPokeItem(pokemon))
        })
        
        pokeCard.append(trainerName, pokeButton, pokeList)
        pokePage.append(pokeCard)
    })
}

function renderPokeItem(pokemon) {
    const pokeItem = document.createElement('li')
    pokeItem.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    const releaseButton = document.createElement('button')
    releaseButton.setAttribute('class', 'release')
    releaseButton.dataset.pokemonId = pokemon.id
    releaseButton.innerText = 'Release'
    releaseButton.addEventListener('click',(()=>{releasePokemon(pokemon.id)}))
    pokeItem.append(releaseButton)
    
    return pokeItem
}

function releasePokemon(pokeId) {
    fetch(POKEMONS_URL + `/${pokeId}`, {
        method: "DELETE"
    }).then ( fetchTrainers )
}

function addPokemon(trainID) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers:
        {
            'Content-Type': 'application/json'
        },

        body:
        {
            trainer_id: trainID
        }
    }).then (fetchTrainers)
}

fetchTrainers();