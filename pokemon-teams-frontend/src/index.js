const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const main = document.querySelector("main");

let trainersList;
let selectedTrainer;
let selectedPokemon;

const fetchTrainers = function() {
  fetch(`${TRAINERS_URL}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      trainersList = response;
      renderTrainers();
    });
};

const renderTrainers = function() {
  main.innerHTML = "";
  trainersList.forEach(function(trainer) {
    const trainerCard = document.createElement("div");
    trainerCard.className = "card";
    trainerCard.setAttribute("data", `id: ${trainer.id}`);
    main.append(trainerCard);

    const trainerName = document.createElement("p");
    trainerName.innerText = trainer.name;

    const addPokemonButton = document.createElement("button");
    addPokemonButton.setAttribute("data", `trainer-id: ${trainer.id}`);
    addPokemonButton.innerText = "Add Pokemon";
    addPokemonButton.addEventListener("click", function(e) {
      selectedTrainer = trainer;
      addPokemon();
    });

    const pokemonsUL = document.createElement("ul");
    trainerCard.append(trainerName, addPokemonButton, pokemonsUL);

    trainer.pokemons.forEach(function(pokemon) {
      const pokemonLI = document.createElement("li");
      pokemonLI.innerText = `${pokemon.nickname} (${pokemon.species})`;
      pokemonsUL.append(pokemonLI);

      const releaseButton = document.createElement("button");
      releaseButton.setAttribute("data", `pokemon-id: ${pokemon.id}`);
      releaseButton.className = "release";
      releaseButton.innerText = "Release";
      pokemonLI.append(releaseButton);
      releaseButton.addEventListener("click", function(e) {
        selectedPokemon = pokemon;
        deletePokemon();
      });
    });
  });
};

const addPokemon = function() {
  if (selectedTrainer.pokemons.length < 6) {
    postPokemon();
  } else {
    alert("Maximum number of pokemon. Release one first.");
  }
};

const postPokemon = function() {
  fetch(`${POKEMONS_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ trainer_id: selectedTrainer.id })
  }).then(function() {
    fetchTrainers();
  });
};

const deletePokemon = function() {
  fetch(`${POKEMONS_URL}/${selectedPokemon.id}`, {
    method: "DELETE"
  }).then(function() {
    alert(`${selectedPokemon.nickname} (${selectedPokemon.species}) released!`);
    fetchTrainers();
  });
};

fetchTrainers();
