const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pokePage = document.querySelector('main')

let dataArray;

fetch(TRAINERS_URL)
.then((resp)=>resp.json())
.then((data)=>{
    dataArray = data
    render()
})

function render() {
    dataArray.forEach((trainer)=>{
        const pokeCard = document.createElement('div')
        pokeCard.setAttribute('class','card')
        pokeCard.dataset.id = 1
        
        const trainerName = document.createElement('p')
        trainerName.innerText = trainer.name

        const pokeButton = document.createElement('button')
        pokeButton.dataset.trainerId = trainer.id
        pokeButton.innerText = 'Add Pokemon'

        const pokeList = document.createElement('ul')
        trainer.pokemons.forEach((pokemon)=>{
            const pokeItem = document.createElement('li')
            pokeItem.innerHTML = `${pokemon.nickname} (${pokemon.species})`
            const releaseButton = document.createElement('button')
            releaseButton.setAttribute('class', 'release')
            releaseButton.dataset.pokemonId = pokemon.id
            releaseButton.innerText = 'Release'
            pokeItem.append(releaseButton)

            pokeList.append(pokeItem)
        })

        pokeCard.append(trainerName, pokeButton, pokeList)
        pokePage.append(pokeCard)
    })
}

//     < div class="card" data - id="1" > <p>Prince</p>
//         <button data-trainer-id="1">Add Pokemon</button>
//         <ul>
//             <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//             <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//             <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//             <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//             <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//         </ul>
// </div >