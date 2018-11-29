require 'faker'

class PokemonsController < ApplicationController
  def index
    @pokemons = Pokemon.all
    render json: @pokemons
  end

  def create
    unless pokemon_params[:trainer_id].nil?
      default = {}

      if Trainer.find(pokemon_params[:trainer_id]).pokemons.count < 6
        if pokemon_params[:nickname].nil?
          default[:nickname] = Faker::Name.first_name
        end

        if pokemon_params[:species].nil?
          default[:species] = Faker::Pokemon.name
          response = JSON.parse(RestClient.get("https://pokeapi.co/api/v2/pokemon-species/#{species.downcase}"))
          id = response["id"]
          sprite_front = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/#{id}.png"
          default[:sprite_front] = sprite_front
        end

        @pokemon = Pokemon.create(pokemon_params.merge(default))
        render json: @pokemon, status: 201
      else
        render json: { error: "Party is Full!"}, status: 403
      end
    else
      render json: { error: "Trainer not found"}, status: 404
    end
  end

  def destroy
    @pokemon = Pokemon.find(params[:id])
    unless @pokemon.nil?
      @pokemon.destroy
      render json: @pokemon
    else
      render json: { error: "Pokemon not Found!" }, status: 404
    end
  end

  private
  def pokemon_params
    params.require(:pokemon).permit(:nickname, :species, :trainer_id, :sprite_front)
  end
end
