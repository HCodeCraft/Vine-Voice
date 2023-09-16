class AddPoisonousToPetsToPlants < ActiveRecord::Migration[6.1]
  def change
    add_column :plants, :poisonous_to_pets, :boolean
  end
end
