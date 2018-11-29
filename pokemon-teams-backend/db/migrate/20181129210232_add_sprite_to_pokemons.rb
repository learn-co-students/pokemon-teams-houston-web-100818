class AddSpriteToPokemons < ActiveRecord::Migration[5.1]
  def change
    add_column :pokemons, :sprite_front, :string
  end
end
