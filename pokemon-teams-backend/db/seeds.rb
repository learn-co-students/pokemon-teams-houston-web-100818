# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'securerandom'
require 'rest-client'

Trainer.delete_all
Pokemon.delete_all

trainers_name = [
  'Prince',
  'Dick',
  'Garry',
  'Jason',
  'Matt',
  'Noah',
  'Adam',
  'Arthur'
]

trainer_collection = []

trainers_name.each do |name|
  trainer_collection << Trainer.create(name: name)
end

trainer_collection.each do |trainer|
  team_size = (SecureRandom.random_number(6) + 1).floor

  (1..team_size).each do |poke|
    name = Faker::Name.first_name
    species = Faker::Pokemon.name
    puts "https://pokeapi.co/api/v2/pokemon-species/#{species.downcase}"
    response = JSON.parse(RestClient.get("https://pokeapi.co/api/v2/pokemon-species/#{species.downcase}"))
    id = response["id"]
    sprite_front = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/#{id}.png"
    Pokemon.create(nickname: name, species: species, trainer_id: trainer.id, sprite_front: sprite_front)
  end


end
